using Microsoft.IdentityModel.Tokens;
using MyProjectBackend.Dto.User;
using MyProjectBackend.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace MyProjectBackend.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserService _userService;
        private readonly IConfigurationSection _secretKey;

        public AuthService(IUserService userService, IConfiguration configuration)
        {
            _userService = userService;
            _secretKey = configuration.GetSection("JWT:SecretKey");
        }

        public string Authenticate(LoginUserDto loginUser)
        {
            var users = _userService.GetAllUsers();
            var user = users.FirstOrDefault(u => u.Username == loginUser.Username);

            if (user == null || !BCrypt.Net.BCrypt.Verify(loginUser.Password, user.Password))
            {
                return null; 
            }

            // claimovi
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim("userId", user.Id.ToString())
            };

            if (user.Username.ToLower() == "admin")
            {
                claims.Add(new Claim(ClaimTypes.Role, "admin"));
            }
            SymmetricSecurityKey secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey.Value)); 
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var tokenOptions = new JwtSecurityToken(issuer: "http://localhost:7121",// tvoj server URL audience:
                "http://localhost:7121", // opcionalno, može biti isti kao issuer
                claims: claims,
                expires: DateTime.Now.AddMinutes(20), 
                signingCredentials: signinCredentials ); 
            string tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

            return tokenString;
        }
    }
}
