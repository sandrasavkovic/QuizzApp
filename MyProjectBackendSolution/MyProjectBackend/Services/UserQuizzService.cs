using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MyProjectBackend.Dto.Question;
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


        public List<UserQuizzDto> GetUserQuizzsById(int id)
        {
            var userQuizzs = _dbContext.UserQuizzs.Where(q => q.UserId == id).ToList();
            return _mapper.Map<List<UserQuizzDto>>(userQuizzs);
        }

        /*
        public UserQuizzDto GetUserQuizById(int id)
        {
            var result = _dbContext.UserQuizzs
                 .Include(q => q.Answers) 
                 .FirstOrDefault(q => q.Id == id);
            return _mapper.Map<UserQuizzDto>(result);
        }
        */
        public UserQuizzDto GetQuizResult(int userQuizzId)
        {
            var userQuizz = _dbContext.UserQuizzs
                .Include(u => u.Answers)       // da učita sve odgovore
                .Include(u => u.Quizz)         // da učita kviz
                    .ThenInclude(q => q.Questions) // pitanja
                        .ThenInclude(q => q.Options) // opcije za pitanja
                .FirstOrDefault(u => u.Id == userQuizzId);
            return _mapper.Map<UserQuizzDto>(userQuizz);
        }

        public List<QuizzQuestionsDto> GetQuestionsForQuizz(int quizId)
        {
            var quizz = _dbContext.Quizzes
                         .Include(q => q.Questions) // obavezno učitava pitanja
                         .ThenInclude(q=>q.Options)
                         .FirstOrDefault(q => q.Id == quizId);

            if (quizz == null)
                return new List<QuizzQuestionsDto>();

            return _mapper.Map<List<QuizzQuestionsDto>>(quizz.Questions);
        }

        public QuizzDto GetQuizzById(int quizzId)
        { 
            var quizz = _dbContext.Quizzes.Where(q=>q.Id == quizzId).FirstOrDefault();
            return _mapper.Map<QuizzDto>(quizz);
        }
    }
}
