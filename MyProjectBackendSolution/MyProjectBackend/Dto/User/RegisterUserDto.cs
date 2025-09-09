namespace MyProjectBackend.Dto.User
{
    public class RegisterUserDto
    {
        public string Username { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }


        public IFormFile ImageFile { get; set; }
    }
}
