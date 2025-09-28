using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyProjectBackend.Dto.Question;
using MyProjectBackend.Interfaces;
using MyProjectBackend.Services;

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
        [Authorize(Roles="admin")]
        public IActionResult CreateQuestion([FromBody] QuestionDto questionDto)
        {
            if (questionDto == null)
                return BadRequest("Question data is required.");

            QuestionDto createdQuestion;
            try
            {
                createdQuestion = _questionService.AddQuestion(questionDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            return Ok(createdQuestion);
        }


        [HttpGet("questions")]
        public IActionResult GetQuestions()
        {
           return Ok(_questionService.GetAllQuestions());
        }

        [HttpPut("update/{id}")]
        [Authorize(Roles = "admin")]
        public IActionResult UpdateQuestion(int id, [FromBody] QuizzQuestionsDto questionDto)
        {
            QuizzQuestionsDto updatedQuestion;
            try
            {
                updatedQuestion = _questionService.UpdateQuestion(id, questionDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            if (updatedQuestion == null)
            {
                return Ok(new
                {
                    success = false,
                    message = "This question cannot be updated because it is part of a quiz that has already been attempted."
                });
            }

            return Ok(new
            {
                success = true,
                question = updatedQuestion
            });
        }


        [HttpDelete("delete/{id}")]
        [Authorize(Roles = "admin")]
        public IActionResult DeleteQuestion(int id)
        {
            bool result;

            try
            {
                result = _questionService.DeleteQuestion(id);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok(new { success = result });
            
           
        }
    }
}
