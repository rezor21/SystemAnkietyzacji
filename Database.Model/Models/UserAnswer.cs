using System;
using System.Collections.Generic;
using System.Text;

namespace Database.Model.Models
{
    public class UserAnswer
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public virtual User User { get; set; }
        public int AnswerId { get; set; }
        public virtual Answer Answer { get; set; }
    }
}
