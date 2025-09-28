using AutoMapper;
using MyProjectBackend.Dto.User;
using MyProjectBackend.Infrastructure;
using MyProjectBackend.Interfaces;
using MyProjectBackend.Models;

namespace MyProjectBackend.Services
{
    public class UserService : IUserService
    {
        private readonly IMapper _mapper;
        private readonly AppDbContext _dbContext;

        public UserService(IMapper mapper, AppDbContext dbContext)
        {
            _mapper = mapper;
            _dbContext = dbContext;
        }   

        public UserDto AddUser(UserDto newUser)
        {
            bool exists = _dbContext.Users.Any(u =>
                  u.Username.ToLower() == newUser.Username.ToLower() ||
                    u.Email.ToLower() == newUser.Email.ToLower());

            if (exists)
            {
                throw new ArgumentException("User with this username or email already exists.");
            }

            User user = _mapper.Map<User>(newUser);
            _dbContext.Users.Add(user);
            try
            {
                _dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception("Error while trying to add user: " + ex.Message, ex);

            }

            return _mapper.Map<UserDto>(user); // vracamo kreirani obhejat nazad
        }

        public bool DeleteUser(int id)
        {
            throw new NotImplementedException();
        }

        public List<UserDto> GetAllUsers()
        {
            List<User> users = _dbContext.Users.ToList();
            List<UserDto> usersDto = _mapper.Map<List<UserDto>>(users);

            return usersDto;
        }

        public UserDto GetUserById(int id)
        {
            User user = _dbContext.Users.Where(u => u.Id == id).FirstOrDefault();
            return _mapper.Map<UserDto>(user);
        }

        public UserDto GetUserByUsername(string username)
        {
            throw new NotImplementedException();
        }
        public UserDto UpdateUser(int id, UserDto userDto)
        {
            throw new NotImplementedException();
        }
    }
}
