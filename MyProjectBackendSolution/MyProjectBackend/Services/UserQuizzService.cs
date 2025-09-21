using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MyProjectBackend.Dto.Question;
using MyProjectBackend.Dto.Quizz;
using MyProjectBackend.Dto.Results;
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


        public List<UserResultsDto> GetUserQuizzsById(int id)
        {
            var userQuizzs = _dbContext.UserQuizzs
                .Where(uq => uq.UserId == id)
                .Include(uq => uq.Quizz)       // da popuni QuizzName
                .Include(uq => uq.Answers)     // da popuni listu odgovora
                .ToList();
            return _mapper.Map<List<UserResultsDto>>(userQuizzs);
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


        public List<GlobalboardDto> GetGlobalboardUsers(int quizzId) {


            bool exists = _dbContext.UserQuizzs.Any(uq => uq.QuizzId == quizzId);
            if (!exists)
            {
                return null;
            }

            //var results = _dbContext.UserQuizzs
            //    .Where(uq => uq.QuizzId == quizzId)
            //    .Include(uq=>uq.Quizz)
            //    .Include(uq => uq.User) // da dohvati username
            //    .OrderByDescending(uq => uq.Score)
            //    .ThenBy(uq => uq.TimeTaken)
            //    .Select(uq => new GlobalboardDto
            //{
            //    Id = uq.Id,
            //    UserId = uq.UserId,
            //    Username = uq.User.Username,
            //    QuizzId = uq.QuizzId,
            //    QuizzName = uq.Quizz.Title,
            //    AttemptDate = uq.AttemptDate,
            //    Score = uq.Score,
            //    TimeTaken = uq.TimeTaken
            //})
            //.ToList();

            var results = _dbContext.UserQuizzs
             .Where(uq => uq.QuizzId == quizzId)
             .Include(uq => uq.User)
             .Include(uq => uq.Quizz)
                .OrderByDescending(uq => uq.Score)
              .ThenBy(uq => uq.TimeTaken)
              .ToList();

            return _mapper.Map<List<GlobalboardDto>>(results);

        
        }
    }
}
