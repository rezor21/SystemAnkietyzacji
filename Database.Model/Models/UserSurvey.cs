using System;
using System.Collections.Generic;
using System.Text;

namespace Database.Model.Models
{
    public class UserSurvey
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public virtual User User { get; set; }
        public int SurveyId { get; set; }
        public virtual Survey Survey { get; set; }
    }
}
