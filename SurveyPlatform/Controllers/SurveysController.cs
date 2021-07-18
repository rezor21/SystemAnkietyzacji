using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic.CompilerServices;
using SurveyPlatform.ViewModels;

namespace SurveyPlatform.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class SurveysController : ControllerBase
    {
        private ISurveyService _surveyService;
        private IUserService _userService;

        private string userId = "";
        public SurveysController(ISurveyService surveyService, IHttpContextAccessor httpContextAccessor, IUserService userService)
        {
            _surveyService = surveyService;
            _userService = userService;
            userId = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier) != null ? httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value : "";
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var surveys = await _surveyService.GetAll();
            var result = surveys.Select(x => (Questionnaire)x).ToList();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var survey = await _surveyService.Get(id);
            var result = (Questionnaire)survey;
            return Ok(result);
        }

        [HttpPost("add")]
        public async Task<IActionResult> Add([FromBody] Questionnaire survey)
        {
            var dbSurvey = await _surveyService.Add((Database.Model.Models.Survey)survey);
            var result = (Questionnaire)dbSurvey;
            return Ok(result);
        }
        [HttpPost("addquestion")]
        public async Task<IActionResult> AddQuestion([FromBody] QuestionnaireItem question)
        {  
            var dbQuestion = await _surveyService.AddQuestion((Database.Model.Models.Question)question);
            var result = (QuestionnaireItem)dbQuestion;
            return Ok(result);
        }
        [HttpPost("update")]
        public async Task<IActionResult> Update([FromBody] Questionnaire survey)
        {
            var dbSurvey = await _surveyService.Update((Database.Model.Models.Survey)survey);
            var result = (Questionnaire)dbSurvey;
            return Ok(result);
        }

        [HttpGet("getallforuser/{userId}")]
        public async Task<IActionResult> GetAllForUser(int userId)
        {
            var surveys = await _surveyService.GetAllForUser(userId);
            var result = surveys.Select(x => (Questionnaire)x).ToList();
            return Ok(result);
        }

        [HttpGet("getforuser/{id}/{userId}")]
        public async Task<IActionResult> GetForUser(int id, int userId)
        {
            var survey = await _surveyService.GetForUser(id, userId);
            var result = (Questionnaire)survey;
            return Ok(result);
        }

        [HttpGet("getallforuser")]
        public async Task<IActionResult> GetAllForUser()
        {
            var surveys = await _surveyService.GetAllForUser(IntegerType.FromString(userId));
            var result = surveys.Select(x => (Questionnaire)x).ToList();
            return Ok(result);
        }

        [HttpGet("getforuser/{id}")]
        public async Task<IActionResult> GetForUser(int id)
        {
            var survey = await _surveyService.GetForUser(id, IntegerType.FromString(userId));
            var result = (Questionnaire)survey;
            return Ok(result);
        }

        [HttpGet("getsurveyusers/{id}")]
        public async Task<IActionResult> GetSurveyUsers(int id)
        {
            var result = new SurveyPermission();
            result.SurveyId = id;
            var list = new List<AllUsersWithSurvey>();
            var survey = await _surveyService.Get(id);
            var users = await _userService.GetAll();
            users = users.Where(x => x.Role.Name != "Administrator").ToList();
            foreach(var user in users)
            {
                var item = new AllUsersWithSurvey
                {
                    UserId = user.Id,
                    UserName = user.Username,
                    SurveyUser = survey.UsersSurveys.Any(x => x.UserId == user.Id)
                };

                list.Add(item);
            }

            result.Data = list;
            
            return Ok(result);
        }

        [HttpPost("setsurveyusers")]
        public async Task<IActionResult> SetSurveyUsers([FromBody] SurveyPermission surveyPermission)
        {
            
            if(surveyPermission == null)
            {
                return BadRequest();
            }

            if (surveyPermission.SurveyId == 0)
            {
                return NotFound();
            }

            var survey = await _surveyService.Get(surveyPermission.SurveyId);

            if (surveyPermission.Data == null)
            {
                survey.UsersSurveys = new List<Database.Model.Models.UserSurvey>();
                await _surveyService.Update(survey);
            }
            else
            {
                survey.UsersSurveys.Clear();
                await _surveyService.UpdateSurveyUsers(survey);
                var permToAdd = surveyPermission.Data.Where(x => x.SurveyUser == true).ToList();
                var surveyUsers = new List<Database.Model.Models.UserSurvey>();
                foreach (var perm in permToAdd)
                {
                    var item = new Database.Model.Models.UserSurvey
                    {
                        SurveyId = surveyPermission.SurveyId,
                        UserId = perm.UserId
                    };
                    if (!(surveyUsers.Any(x => x.SurveyId == item.SurveyId && x.UserId == item.UserId)))
                    {
                        surveyUsers.Add(item);
                    }
                    
                }

                
                survey.UsersSurveys = surveyUsers;
            }

            await _surveyService.UpdateSurveyUsers(survey);

            return Ok(surveyPermission);
        }

        [HttpPost("addanswer")]
        public async Task<IActionResult> AddAnswer([FromBody] Question question)
        {

            if (question == null)
            {
                return BadRequest();
            }

            if (question.QuestionId == 0 || question.AnswerId == 0)
            {
                return NotFound();
            }

            var result = await _surveyService.AddAnswers(question.AnswerId, IntegerType.FromString(userId));

            return Ok(result);
        }

        [HttpGet("getdatarows/{surveyId}")]
        public async Task<IActionResult> GetDataRows(int surveyId)
        {
            var survey = await _surveyService.Get(surveyId);
            var result = new List<DataRow>();

            foreach(var question in survey.Questions)
            {
                foreach(var answer in question.Answers)
                {
                    foreach (var userAnswer in answer.UsersAnswers)
                    {
                        var item = new DataRow
                        {
                            UserName = userAnswer.User.Username,
                            AnswerTitle = userAnswer.Answer.Title,
                            QuestionTitle = question.Title
                        };

                        result.Add(item);
                    }
                }
            }

            

            return Ok(result);
        }
    }
}