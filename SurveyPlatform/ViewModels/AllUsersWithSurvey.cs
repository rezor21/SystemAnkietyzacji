using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SurveyPlatform.ViewModels
{
    public class AllUsersWithSurvey
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public bool SurveyUser { get; set; }
    }
}
