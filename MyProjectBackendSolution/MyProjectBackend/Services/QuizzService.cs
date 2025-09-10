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
            Quizz quizz = _mapper.Map<Quizz>(newQuizz);
            _dbContext.Quizzes.Add(quizz);
            _dbContext.SaveChanges();
            return _mapper.Map<QuizzDto>(quizz);
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

        public List<Theme> GetThemesByIds(List<int> ids)
        { 
            List<Theme>themes = _dbContext.Themes.Where(t => ids.Contains(t.Id)).ToList();
            return themes;
        }

        public int GetMaxScore(List<int> ids)
        {
            List<Theme> themes = _dbContext.Themes.Where(t => ids.Contains(t.Id)).ToList();
            List<Question> questions = new List<Question>();
            foreach (Theme t in themes)
            {
                if (t.Questions != null)
                    questions.AddRange(t.Questions);
            }
            int score = questions.Sum(q => q.Points);
            return score;
        }
    }
}
