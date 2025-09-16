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
           User user = _mapper.Map<User>(newUser);
            _dbContext.Users.Add(user);
            _dbContext.SaveChanges();

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
