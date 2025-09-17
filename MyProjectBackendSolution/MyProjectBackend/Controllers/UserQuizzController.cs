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
                TotalQuestionsCount = userResultDto.TotalQuestionsCount,
                CorrectAnswersCount = userResultDto.CorrectAnswersCount,
                AttemptDate = userResultDto.AttemptDate,
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

        [HttpGet("results/{userId}")]
        public IActionResult GetAllUserResults(int userId)
        {
          
            return Ok(_userquizzservice.GetUserQuizzsById(userId));
        }

        [HttpGet("result/{id}")]
        public IActionResult GetQuizzResult(int id)
        {
            var result = _userquizzservice.GetQuizResult(id);
            if (result == null)
                return NotFound();

            return Ok(result);
        }

        [HttpGet("questions/{quizzId}")]
        public IActionResult GetQuestionsForQuizz(int quizzId)
        {
            return Ok(_userquizzservice.GetQuestionsForQuizz(quizzId));
            
        }

        [HttpGet("quizz/{quizzId}")]
        public IActionResult GetQuizzById(int quizzId)
        {
            return Ok(_userquizzservice.GetQuizzById(quizzId));

        }
    }
}
