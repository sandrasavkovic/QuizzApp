using AutoMapper;
using MyProjectBackend.Dto.Quizz;
using MyProjectBackend.Infrastructure;
using MyProjectBackend.Interfaces;
using MyProjectBackend.Models;

namespace MyProjectBackend.Services
{
    public class QuizzService : IQuizzService
    {
        private readonly IMapper _mapper;
        private readonly AppDbContext _dbContext;

        public QuizzService(IMapper mapper, AppDbContext dbContext)
        { 
            _mapper = mapper;
            _dbContext = dbContext;
        }

        public QuizzDto AddQuizz(QuizzDto newQuizz)
        {
            throw new NotImplementedException();
        }

        public bool DeleteQuizz(int id)
        {
            throw new NotImplementedException();
        }

        public List<QuizzDto> GetAllQuizzes()
        {
            List<Quizz> quizzess = _dbContext.Quizzes.ToList();
            List<QuizzDto> quizessDto = _mapper.Map<List<QuizzDto>>(quizzess);
            return quizessDto;
        }

        public QuizzDto GetQuizzById(int id)
        {
            throw new NotImplementedException();
        }

        public QuizzDto UpdateQuizz(int id, QuizzDto updatedQuizz)
        {
            throw new NotImplementedException();
        }
    }
}
