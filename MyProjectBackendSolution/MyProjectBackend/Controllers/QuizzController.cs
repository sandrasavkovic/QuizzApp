using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyProjectBackend.Dto.Quizz;
using MyProjectBackend.Interfaces;

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


    }
}
