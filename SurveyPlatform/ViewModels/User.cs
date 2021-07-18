using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SurveyPlatform.ViewModels
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Rolename { get; set; }

        public static explicit operator User(Database.Model.Models.User dbUser)
        {
            if (dbUser == null) { return (User)null; }
            var user = new User
            {
                Id = dbUser.Id,
                Username = dbUser.Username,
                Rolename = dbUser.Role == null ? "" : dbUser.Role.Name
            };

            return user;
        }
    }
}
