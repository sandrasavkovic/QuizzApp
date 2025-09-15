using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MyProjectBackend.Dto.Quizz;
using MyProjectBackend.Dto.User;
using MyProjectBackend.Infrastructure;
using MyProjectBackend.Interfaces;
using MyProjectBackend.Models;

namespace MyProjectBackend.Services
{
    public class UserQuizzService:IUserQuizz
    {
        private readonly IMapper _mapper;
        private readonly AppDbContext _dbContext;

        public UserQuizzService(IMapper mapper, AppDbContext dbContext)
        {
            _mapper = mapper;
            _dbContext = dbContext;
        }
        public UserQuizzDto AddUserQuizz(UserQuizz newUserQuizz)
        {
            UserQuizz userQuizz = _mapper.Map<UserQuizz>(newUserQuizz);
            _dbContext.UserQuizzs.Add(userQuizz);
            _dbContext.SaveChanges();

            return _mapper.Map<UserQuizzDto>(userQuizz);
        }

      
        public List<UserQuizzDto> GetAllUserQuizzes()
        {
            List<UserQuizz> userQuizzs = _dbContext.UserQuizzs.ToList();
            List<UserQuizzDto> usersDto = _mapper.Map<List<UserQuizzDto>>(userQuizzs);
            return usersDto;
        }


        public UserQuizzDto GetUserQuizzById(int id)
        {
            UserQuizz userQuizz = _dbContext.UserQuizzs.Where(q => q.Id == id).FirstOrDefault();
            return _mapper.Map<UserQuizzDto>(userQuizz);
        }
    }
}
