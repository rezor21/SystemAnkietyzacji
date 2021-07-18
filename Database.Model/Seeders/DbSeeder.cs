using Database.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Database.Model.Seeders
{
    public static class DbSeeder
    {
        public static void Initialize(DatabaseContext context)
        {
            SeedRoles(context);
            SeedUsers(context);
        }

        private static void SeedUsers(DatabaseContext context)
        {
            if (context.Users.Any())
            {
                return;
            }

            //var users = new User[]
            //{
            //new User{Username="admin", Password="admin", Role = context.Roles.SingleOrDefault(x => x.Name == "Administrator")},
            //new User{Username="test", Password="test", Role = context.Roles.SingleOrDefault(x => x.Name == "Użytkownik")}
            //};
            //foreach (User u in users)
            //{
            //    context.Users.Add(u);
            //}
            //context.SaveChanges();
        }

        private static void SeedRoles(DatabaseContext context)
        {
            if (context.Roles.Any())
            {
                return;
            }

            var roles = new Role[]
            {
            new Role{Name = "Administrator"},
            new Role{Name = "Użytkownik"}

            };
            foreach (Role r in roles)
            {
                context.Roles.Add(r);
            }
            context.SaveChanges();
        }
    }
}
