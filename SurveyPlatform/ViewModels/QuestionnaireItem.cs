using NuGet.Frameworks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SurveyPlatform.ViewModels
{
    public class QuestionnaireItem
    {
        public int Id { get; set; }
        public string Question { get; set; }
        public int SurveyId { get; set; }
        public ICollection<Answer> Answers { get; set; }

        public static explicit operator QuestionnaireItem(Database.Model.Models.Question dbItem)
        {
            if (dbItem == null) { return (QuestionnaireItem)null; }
            var item = new QuestionnaireItem
            {
                Id = dbItem.Id,
                Question = dbItem.Title,
                SurveyId = dbItem.SurveyId,
                Answers = dbItem.Answers != null ? dbItem.Answers.Select(x => (Answer)x).ToList() : null
            };

            return item;
        }

        public static explicit operator Database.Model.Models.Question(QuestionnaireItem item)
        {
            if (item == null) { return (Database.Model.Models.Question)null; }
            var dbItem = new Database.Model.Models.Question
            {
                Id = item.Id,
                Title = item.Question,
                SurveyId = item.SurveyId,
                Answers = item.Answers != null ? item.Answers.Select(x => (Database.Model.Models.Answer)x).ToList() : null
            };

            return dbItem;
        }
    }
}
