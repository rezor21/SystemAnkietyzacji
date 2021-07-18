using Database.Model.Models;
using Database.Model.Seeders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Database.Model
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) 
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Answer> Answers { get; set; }
        public DbSet<Survey> Surveys { get; set; }
        public DbSet<UserAnswer> UsersAnswers { get; set; }
        public DbSet<UserSurvey> UsersSurveys { get; set; }
    }
}
