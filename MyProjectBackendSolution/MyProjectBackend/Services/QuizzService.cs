using AutoMapper;
using Microsoft.EntityFrameworkCore;
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
            var themes = GetThemesByIds(newQuizz.Themes.Select(t => t.Id).ToList());
            quizz.Themes = themes;
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

        public List<BasicQuizzInfoDto> GetBasicQuizzes()
        {
            var quizzes = _dbContext.Quizzes
                .Select(q => new BasicQuizzInfoDto
                {
                    Id = q.Id,
                    Title = q.Title,
                    Description = q.Description,
                    Themes = q.Themes,
                    QuestionCount = q.Themes.SelectMany(t => t.Questions).Count(),
                    Difficulty = q.Difficulty,
                    TimeLimit = q.TimeLimit
                })
                .ToList();

            return quizzes;
        }

        public QuizzDto GetQuizzById(int id)
        {
            var quizz = _dbContext.Quizzes
                      .Include(q => q.Themes)
                      .ThenInclude(t => t.Questions)
                      .FirstOrDefault(q => q.Id == id);

            return _mapper.Map<QuizzDto>(_dbContext.Quizzes.Find(id));
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

        public List<Question> GetQuestionsForQuizz(List<Theme> themes)
        { 
            List<Question> questions = new List<Question>();
            foreach (Theme theme in themes)
            {
                questions.AddRange(theme.Questions);
            }
            return questions;
        }


    }
}
