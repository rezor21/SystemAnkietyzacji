using Database.Model.Models;
using Interfaces.Services;
using Microsoft.EntityFrameworkCore.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;

namespace Services
{
    public class SurveyService : ISurveyService
    {
        private readonly Database.Model.DatabaseContext _context;

        public SurveyService(Database.Model.DatabaseContext context)
        {
            _context = context;
        }

        public async Task<Survey> Get(int id)
        {
            var dbSurvey = await Task.Run(() => _context.Surveys.SingleOrDefault(x => x.Id == id));

            if (dbSurvey == null)
                return null;

            return dbSurvey;
        }

        public async Task<IEnumerable<Survey>> GetAll()
        {
            return await Task.Run(() => _context.Surveys.ToList());
        }

        public async Task<Survey> Add(Survey survey)
        {
            Survey dbSurvey = new Survey();
            if (survey.Id == 0)
            {
                _context.Surveys.Add(survey);
                _context.SaveChanges();
                dbSurvey = _context.Surveys.SingleOrDefault(x => x.Id == survey.Id);
            }
            else
            {
                return null;
            }

            return dbSurvey;
        }

        public async Task<Survey> Update(Survey survey)
        {
            Survey dbSurvey = new Survey();
            if(survey.Id == 0)
            {
                return null;
            }

            dbSurvey = await Task.Run(() => _context.Surveys.SingleOrDefault(x => x.Id == survey.Id));

            dbSurvey.Description = survey.Description;
            dbSurvey.Title = survey.Title;
            dbSurvey.Questions = survey.Questions;

            _context.Surveys.Update(dbSurvey);
            _context.SaveChanges();

            return null;
        }

        
        public async Task<Survey> GetForUser(int id, int userId)
        {
            var dbSurvey = await Task.Run(() => _context.Surveys.SingleOrDefault(x => x.Id == id));

            if (dbSurvey == null)
                return null;

            return dbSurvey;
        }

        public async Task<IEnumerable<Survey>> GetAllForUser(int userId)
        {
            return await Task.Run(() => _context.Surveys.ToList());
        }

        public async Task<Question> AddQuestion(Question question)
        {
            var dbSurvey = await Task.Run(() => _context.Surveys.SingleOrDefault(x => x.Id == question.SurveyId));

            if(dbSurvey.Questions == null)
            {
                dbSurvey.Questions = new List<Question>();
            }
            if (question.Id == 0)
            {
                    dbSurvey.Questions.Add(question);
            }
            else
            {
               var dbQuestion = dbSurvey.Questions.SingleOrDefault(x => x.Id == question.Id);
                dbQuestion.SurveyId = question.SurveyId;
                dbQuestion.Title = question.Title;
                if (dbQuestion.Answers != null)
                {
                    var answers = dbQuestion.Answers.ToList();
                    foreach (var answer in question.Answers)
                    {
                        if (answer.Id != 0)
                        {
                            var dbAnswer = answers.SingleOrDefault(x => x.Id == answer.Id);
                            dbAnswer.Title = answer.Title;
                            dbAnswer.UsersAnswers = answer.UsersAnswers;

                        }
                        else
                        {
                            answers.Add(answer);
                        }
                    }

                    dbQuestion.Answers = answers;
                }            
                else
                {
                    dbQuestion.Answers = question.Answers;
                }
                
            }

            _context.Surveys.Update(dbSurvey);
            _context.SaveChanges();

            dbSurvey = await Task.Run(() => _context.Surveys.SingleOrDefault(x => x.Id == question.SurveyId));
            return dbSurvey.Questions.FirstOrDefault(x => x.Title == question.Title);
        }


        public async Task<bool> UpdateSurveyUsers(Survey dbSurvey)
        {
            _context.Surveys.Update(dbSurvey);
            _context.SaveChanges();

            return true;
        }

        public async Task<bool> AddAnswers(int answerId, int userId)
        {
            _context.UsersAnswers.Add(new UserAnswer { UserId = userId, AnswerId = answerId});
            _context.SaveChanges();

            return true;
        }

    }
}
