using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SurveyPlatform.ViewModels;

namespace SurveyPlatform.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private IUserService _userService;
        private string userId = "";
        public UsersController(IUserService userService, IHttpContextAccessor httpContextAccessor)
        {
            _userService = userService;
           userId = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier) != null ? httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value : "";
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody]LoginViewModel model)
        {
            var user = (User) await _userService.Login(model.Username, model.Password);

            if (user == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(user);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var users = await _userService.GetAll();
            var result = users.Select(x => (User)x).ToList();
            return Ok(result);
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody]LoginViewModel model)
        {
            var user = (User)await _userService.Register(model.Username, model.Password);

            if (user == null)
                return BadRequest(new { message = "Username already exist in database" });

            return Ok(user);
        }
    }
}