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
        public AuthController(IUserService userService, IConfiguration configuration)
        {
            _userService = userService;
            _secretKey = configuration.GetSection("JWT:SecretKey");

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
            string username = loginUser.Username;
            string password = loginUser.Password;

            List<UserDto> users = _userService.GetAllUsers();

            var user = users.FirstOrDefault(u => u.Username == username);
            // BCrypt.Verify(unetiPAss, hashovaniUbazi)
            if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.Password))
            {
                return Unauthorized("Invalid username or password.");
            }
            // claimovi, ako je username Admin, onda je i role Admin
            List<Claim> claims = new List<Claim>
            {
                 new Claim(ClaimTypes.Name, user.Username),
                  new Claim("userId", user.Id.ToString())

            };

            if (user.Username.ToLower() == "admin")
            {
                claims.Add(new Claim(ClaimTypes.Role, "admin"));
            }

            // Kreiramo JWT token
            SymmetricSecurityKey secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey.Value));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

            var tokenOptions = new JwtSecurityToken(
                issuer: "http://localhost:7121", // tvoj server URL
                audience: "http://localhost:7121", // opcionalno, može biti isti kao issuer
                claims: claims,
                expires: DateTime.Now.AddMinutes(20),
                signingCredentials: signinCredentials
            );

            string tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

            return Ok(new { Token = tokenString });
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

            //_userService.AddUser(userDto);


            return Ok(_userService.AddUser(userDto));
        }


        [HttpGet("getById/{userId}")]
        public IActionResult GetUserById(int userId)
        { 
            return Ok(_userService.GetUserById(userId));
        }

    }
}
