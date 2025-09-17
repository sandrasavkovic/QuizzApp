using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyProjectBackend.Dto.Theme;
using MyProjectBackend.Interfaces;
using MyProjectBackend.Models;

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
        public IActionResult CreateTheme([FromBody] ThemeDto themeDto)
        {
            if (string.IsNullOrEmpty(themeDto.Name))
                return BadRequest("Theme name is required");
            ThemeDto theme = _themeService.AddTheme(themeDto);
           
            return Ok(theme); // Theme, a ne theme dto
        }



        [HttpPut("update/{id}")]
        public IActionResult UpdateTheme(int id, [FromBody] ThemeDto theme)
        {
            return Ok(_themeService.UpdateTheme(id, theme));
        }


        [HttpDelete("delete/{id}")]
        public IActionResult DeleteTheme(int id)
        {
            return Ok(_themeService.DeleteTheme(id));
        }
    }
}
