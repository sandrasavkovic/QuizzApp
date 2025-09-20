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


        [HttpGet("questions")]
        public IActionResult GetQuestions()
        {
           return Ok(_questionService.GetAllQuestions());
        }

        [HttpPut("update/{id}")]
        public IActionResult UpdateQuestion(int id, [FromBody] QuizzQuestionsDto questionDto)
        {

            var result = _questionService.UpdateQuestion(id, questionDto);

            if (result == null)
            {
                return Conflict("This question cannot be updated because it is part of a quiz that has already been attempted.");
            }

            return Ok(result);
        }


        [HttpDelete("delete/{id}")]
        public IActionResult DeleteQuestion(int id)
        {
            bool isDeleted = _questionService.DeleteQuestion(id);
            if (!isDeleted)
            {
                return Conflict("This question cannot be deleted because it is used in a quiz.");
            }
            return Ok();
        }
    }
}
