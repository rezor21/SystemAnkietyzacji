using Database.Model.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Interfaces.Services
{
    public interface ISurveyService
    {
        Task<Survey> Get(int id);
        Task<IEnumerable<Survey>> GetAll();
        Task<Survey> Add(Survey survey);
        Task<Survey> Update(Survey survey);
        Task<Survey> GetForUser(int id, int userId);
        Task<IEnumerable<Survey>> GetAllForUser(int userId);
        Task<Question> AddQuestion(Question question);
        Task<bool> UpdateSurveyUsers(Survey dbSurvey);
        Task<bool> AddAnswers(int answerId, int userId);
    }
}
