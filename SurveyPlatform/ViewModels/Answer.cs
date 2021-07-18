using System;
using System.Collections.Generic;
using System.Text;

namespace SurveyPlatform.ViewModels
{
    public class Answer
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public bool Value { get; set; }

        public static explicit operator Answer(Database.Model.Models.Answer dbItem)
        {
            if (dbItem == null) { return (Answer)null; }
            var item = new Answer
            {
                Id = dbItem.Id,
                Title = dbItem.Title
            };

            return item;
        }

        public static explicit operator Database.Model.Models.Answer(Answer item)
        {
            if (item == null) { return (Database.Model.Models.Answer)null; }
            var dbItem = new Database.Model.Models.Answer
            {
                Id = item.Id,
                Title = item.Title
            };

            return dbItem;
        }
    }
}
