using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyProjectBackend.Dto.Question;
using MyProjectBackend.Interfaces;

namespace MyProjectBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionController : ControllerBase
    {
        private readonly IQuestionService _questionService;

        public QuestionController(IQuestionService questionService)
        { 
            _questionService = questionService;
        }

        [HttpPost("create")]
        public IActionResult CreateQuestion([FromBody] QuestionDto questionDto)
        {
            if (questionDto == null)
                return BadRequest("Question data is required.");

            var createdQuestion = _questionService.AddQuestion(questionDto);
            return Ok(createdQuestion);
        }
    }
}
