using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyProjectBackend.Dto.Question;
using MyProjectBackend.Dto.Theme;
using MyProjectBackend.Interfaces;
using MyProjectBackend.Models;
using MyProjectBackend.Services;

namespace MyProjectBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ThemeController : ControllerBase
    {
        private readonly IThemeService _themeService;

        public ThemeController(IThemeService themeService)
        {
            _themeService = themeService;
        }

        [HttpGet("themes")]
        public IActionResult GetThemes()
        { 
            List<ThemeDto>themes = _themeService.GetAllThemes();
            return Ok(themes);
        }

        [HttpPost("create")]
        [Authorize(Roles = "admin")]
        public IActionResult CreateTheme([FromBody] ThemeDto themeDto)
        {
            if (string.IsNullOrEmpty(themeDto.Name))
                return BadRequest("Theme name is required");
            ThemeDto theme;
            try
            {
                 theme = _themeService.AddTheme(themeDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
           
            return Ok(theme); // Theme, a ne theme dto
        }



        [HttpPut("update/{id}")]
        [Authorize(Roles = "admin")]
        public IActionResult UpdateTheme(int id, [FromBody] ThemeDto theme)
        {
            ThemeDto res;
            try
            {
                 res = _themeService.UpdateTheme(id, theme);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            if (res == null)
            {
                return Ok(new
                {
                    success = false,
                    message = "This theme cannot be updated because it is part of a quiz that has already been attempted."
                });
            }

            return Ok(new
            {
                success = true,
                updatedTheme = res
            });
        }


        [HttpDelete("delete/{id}")]
        [Authorize(Roles = "admin")]
        public IActionResult DeleteTheme(int id)
        {
            bool result;
            try
            {
                result = _themeService.DeleteTheme(id);
                return Ok(new { success = result });

            }
            catch (Exception ex) 
                {
                    return BadRequest(ex.Message);
                }

        }
    }
}
