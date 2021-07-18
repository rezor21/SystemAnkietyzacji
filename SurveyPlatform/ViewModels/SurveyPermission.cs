using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SurveyPlatform.ViewModels
{
    public class SurveyPermission
    {
        public int SurveyId { get; set; }
        public ICollection<AllUsersWithSurvey> Data { get; set; }
    }
}
