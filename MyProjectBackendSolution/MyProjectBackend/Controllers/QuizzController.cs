using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyProjectBackend.Dto.Question;
using MyProjectBackend.Dto.Quizz;
using MyProjectBackend.Dto.Theme;
using MyProjectBackend.Interfaces;
using MyProjectBackend.Models;
using MyProjectBackend.Services;

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
        [Authorize(Roles = "admin")]
        public IActionResult Create(CreateQuizzDto createdQuizz)
        {
            List<Theme> themes = _quizzService.GetThemesByIds(createdQuizz.ThemeIds); 

            List<QuestionDto> questions = _quizzService.GetQuestionsForIds(createdQuizz.QuestionIds);
            int maxScore = _quizzService.GetMaxScore(questions);


            var quiz = new QuizzDto
            {
                Title = createdQuizz.Title,
                Description = createdQuizz.Description,
                TimeLimit = createdQuizz.TimeLimit,
                MaxScore = maxScore,
                Difficulty = createdQuizz.Difficulty,
                QuestionIds = createdQuizz.QuestionIds,
                ThemeIds = createdQuizz.ThemeIds,
            };
            QuizzDto newQuizz;
            try
            {
                newQuizz = _quizzService.AddQuizz(quiz);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            return Ok(newQuizz);
        }


        [HttpGet("getById/{quizId}")]
        public IActionResult GetQuizById(int quizId)
        {
            DisplayQuizzDto quizz = _quizzService.GetQuizzById(quizId);
            return Ok(quizz);

        }

        [HttpPut("update/{id}")]
        [Authorize(Roles = "admin")]
        public IActionResult UpdateQuizz(int id, [FromBody] QuizzDto quizzDto)
        {

            QuizzDto updatedQuizz;
            try
            {
                updatedQuizz = _quizzService.UpdateQuizz(id, quizzDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            if (updatedQuizz == null)
            {
                return Ok(new
                {
                    success = false,
                    message = "This quizz cannot be updated because it is part of a quiz that has already been attempted."
                });
            }

            return Ok(new
            {
                success = true,
                quizz = updatedQuizz
            });
        }


        [HttpDelete("delete/{id}")]
        [Authorize(Roles = "admin")]
        public IActionResult DeleteQuizz(int id)
        {
            bool result;
            try
            {
                result = _quizzService.DeleteQuizz(id);
                return Ok(new { success = result });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
