using Database.Model.Models;
using Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Services
{
    public class UserService : IUserService
    {
        private readonly Database.Model.DatabaseContext _context;

        public UserService(Database.Model.DatabaseContext context)
        {
            _context = context;
        }

        public async Task<User> Login(string username, string password)
        {
            var user = await Task.Run(() => _context.Users.SingleOrDefault(x => x.Username == username && x.Password == password));

            if (user == null)
                return null;

            return user;
        }

        public async Task<IEnumerable<User>> GetAll()
        {
            return await Task.Run(() => _context.Users.ToList());
        }

        public async Task<User> Register(string username, string password)
        {
            var user = await Task.Run(() => _context.Users.SingleOrDefault(x => x.Username == username));

            if (user == null)
            {
                var role = _context.Roles.SingleOrDefault(x => x.Name == "Użytkownik");

                if(role == null)
                {
                    return null;
                }

                user = new User
                {
                    Password = password,
                    Username = username,
                    RoleId = role.Id
                };
            }

            _context.Users.Add(user);
            _context.SaveChanges();

            return user;
        }
    }
}
