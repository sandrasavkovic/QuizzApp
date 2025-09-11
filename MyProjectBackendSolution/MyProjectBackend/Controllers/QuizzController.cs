using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyProjectBackend.Dto.Quizz;
using MyProjectBackend.Interfaces;
using MyProjectBackend.Models;

namespace MyProjectBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuizzController : ControllerBase
    {
        private readonly IQuizzService _quizzService;
        // moraaa da se injektuje servis !!
        public QuizzController(IQuizzService quizzService)
        {
            _quizzService = quizzService;
        }

        [HttpGet("quizzes")]
        public IActionResult GetQuizzes()
        { 
           List<QuizzDto> quizzess = _quizzService.GetAllQuizzes();
          return Ok(quizzess ?? new List<QuizzDto>());

        }

        [HttpGet("basic")]
        public IActionResult GetBasicQuizzes()
        {
            var quizzes = _quizzService.GetBasicQuizzes();
            return Ok(quizzes ?? new List<BasicQuizzInfoDto>());
        }


        [HttpPost("create")]
        public IActionResult Create(CreateQuizzDto createdQuizz)
        {
            List<Theme> themes = _quizzService.GetThemesByIds(createdQuizz.ThemeIds);
            int maxScore = _quizzService.GetMaxScore(createdQuizz.ThemeIds);
            var quiz = new QuizzDto
            {
                Title = createdQuizz.Title,
                Description = createdQuizz.Description,
                TimeLimit = createdQuizz.TimeLimit,
                MaxScore = maxScore,
                Difficulty = createdQuizz.Difficulty,
                Themes = themes
            };
            QuizzDto newQuizz = _quizzService.AddQuizz(quiz);
            return Ok(newQuizz);
        }

        [HttpGet("getById/{quizId}")]
        public IActionResult GetQuizById(int quizId)
        {
            QuizzDto quizz = _quizzService.GetQuizzById(quizId);
            return Ok(quizz);

        }
    }
}
