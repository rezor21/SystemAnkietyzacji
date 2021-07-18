using System;
using System.Collections.Generic;
using System.Text;

namespace Database.Model.Models
{
    public class Answer
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int QuestionId { get; set; }
        public virtual ICollection<UserAnswer> UsersAnswers { get; set; }
}
}
