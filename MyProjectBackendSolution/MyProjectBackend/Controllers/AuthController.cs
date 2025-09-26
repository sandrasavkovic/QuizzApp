using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MyProjectBackend.Dto.User;
using MyProjectBackend.Interfaces;
using MyProjectBackend.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace MyProjectBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IConfigurationSection _secretKey;
        private readonly IAuthService _authService;
        public AuthController(IUserService userService, IConfiguration configuration, IAuthService authService)
        {
            _userService = userService;
            _secretKey = configuration.GetSection("JWT:SecretKey");
            _authService = authService;
        }

        /*

        [HttpPost("register")]
        public IActionResult Register([FromBody] UserDto userDto)
        { 
            return Ok(_userService.AddUser(userDto));
        }
        */

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginUserDto loginUser)
        {
            var token = _authService.Authenticate(loginUser);

            if (token == null)
            {
                return Unauthorized("Invalid username or password.");
            }

            return Ok(new { Token = token });
        }

        [HttpPost("register")]
        public IActionResult Register([FromForm] RegisterUserDto registerDto)
        {
            string imageUrl = null;
            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(registerDto.Password);

            // validacije polja
            if (string.IsNullOrWhiteSpace(registerDto.Password) || registerDto.Password.Length < 6)
            {
                return BadRequest("Password should have at least 6 characters.");
            }

            var existingUser = _userService.GetAllUsers()
                                  .FirstOrDefault(u => u.Username.ToLower() == registerDto.Username.ToLower());
            if (existingUser != null)
            {
                return BadRequest("Username alredy exists!");
            }

            var existingEmail = _userService.GetAllUsers()
                                 .FirstOrDefault(u => u.Email.ToLower() == registerDto.Email.ToLower());
            if (existingEmail != null)
            {
                return BadRequest("User with this email alredy exists!");
            }

            if (registerDto.ImageFile != null && registerDto.ImageFile.Length > 0)
            {
                var fileName = Guid.NewGuid() + Path.GetExtension(registerDto.ImageFile.FileName);
                var imagesFolder = Path.Combine("wwwroot", "images");

                if (!Directory.Exists(imagesFolder))
                    Directory.CreateDirectory(imagesFolder);

                var filePath = Path.Combine(imagesFolder, fileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    registerDto.ImageFile.CopyTo(stream);
                }

                var baseUrl = $"{Request.Scheme}://{Request.Host}";
                imageUrl = $"{baseUrl}/images/{fileName}";

            }

            var userDto = new UserDto
            {
                Username = registerDto.Username,
                Email = registerDto.Email,
                Password = hashedPassword,
                Image = imageUrl
            };


            return Ok(_userService.AddUser(userDto));
        }


        [HttpGet("getById/{userId}")]
        public IActionResult GetUserById(int userId)
        { 
            return Ok(_userService.GetUserById(userId));
        }

    }
}
