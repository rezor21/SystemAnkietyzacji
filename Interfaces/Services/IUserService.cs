using Database.Model.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Interfaces.Services
{
    public interface IUserService
    {
        Task<User> Login(string username, string password);
        Task<IEnumerable<User>> GetAll();
        Task<User> Register(string username, string password);
    }
}
