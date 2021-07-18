using System;
using System.Collections.Generic;
using System.Text;

namespace Database.Model.Models
{
    public class Question
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int SurveyId { get; set; }
        public virtual ICollection<Answer> Answers { get; set; }
    }
}
