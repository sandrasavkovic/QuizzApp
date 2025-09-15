using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyProjectBackend.Dto.Quizz;
using MyProjectBackend.Interfaces;
using MyProjectBackend.Models;

namespace MyProjectBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserQuizzController : ControllerBase
    {
        private readonly IUserQuizz _userquizzservice;

        public UserQuizzController(IUserQuizz userquizzservice)
        { 
            _userquizzservice = userquizzservice;
        }

        [HttpPost("save")]
        public IActionResult Save([FromBody] UserQuizzDto userResultDto)
        {
            if (userResultDto == null)
                return BadRequest("Invalid quiz result data.");

            var userQuizz = new UserQuizz
            {
                UserId = userResultDto.UserId,
                QuizzId = userResultDto.QuizzId,
                AttempDate = userResultDto.AttemptDate,
                Score = userResultDto.Score,
                Percentage = userResultDto.Percentage,
                TimeTaken = userResultDto.TimeTaken,
                Answers = userResultDto.Answers.Select(a => new UserAnswer
                {
                    QuestionId = a.QuestionId,
                    Answer = a.Answer,
                    IsCorrect = a.IsCorrect
                }).ToList()
            };

            return Ok(_userquizzservice.AddUserQuizz(userQuizz));

        }

    }
}
