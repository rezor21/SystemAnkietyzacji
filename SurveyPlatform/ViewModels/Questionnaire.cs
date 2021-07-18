using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SurveyPlatform.ViewModels
{
    public class Questionnaire
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public ICollection<QuestionnaireItem> Questions { get; set; }

        public static explicit operator Questionnaire(Database.Model.Models.Survey dbItem)
        {
            if (dbItem == null) { return (Questionnaire)null; }
            var item = new Questionnaire
            {
                Id = dbItem.Id,
                Title = dbItem.Title,
                Description = dbItem.Description,
                Questions = dbItem.Questions != null ? dbItem.Questions.Select(x => (QuestionnaireItem)x).ToList() : null
            };

            return item;
        }

        public static explicit operator Database.Model.Models.Survey(Questionnaire item)
        {
            if (item == null) { return (Database.Model.Models.Survey)null; }
            var dbItem = new Database.Model.Models.Survey
            {
                Id = item.Id,
                Title = item.Title,
                Description = item.Description,
                Questions = item.Questions != null ? item.Questions.Select(x => (Database.Model.Models.Question)x).ToList() : null
            };

            return dbItem;
        }
    }
}
