using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MyProjectBackend.Dto.Question;
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
            // var themes = GetThemesByIds(newQuizz.Themes.Select(t => t.Id).ToList());
            // quizz.Themes = themes;
            // pri dodavanju pitanja saljemo id-eve tema, pa ovde samo zapravo
            // pitanju dajemo objekat Theme na osnovu themeId
            //foreach (var question in quizz.Questions)
            //{
            //    question.Theme = _dbContext.Themes.FirstOrDefault(t => t.Id == question.ThemeId);
            //}
            quizz.Questions = _dbContext.Questions
            .Where(q => newQuizz.QuestionIds.Contains(q.Id))
            .ToList();

            // Poveži teme
            quizz.Themes = _dbContext.Themes
                .Where(t => newQuizz.ThemeIds.Contains(t.Id))
                .ToList();

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
                    //  QuestionCount = q.Themes.SelectMany(t => t.Questions).Count(),
                    QuestionCount = q.Questions.Count,
                    Difficulty = q.Difficulty,
                    TimeLimit = q.TimeLimit
                })
                .ToList();

            return quizzes;
        }

        public DisplayQuizzDto GetQuizzById(int id)
        {
            var quizz = _dbContext.Quizzes
                 //     .Include(q => q.Themes)
                      //.ThenInclude(t => t.Questions)
                      .Include(q => q.Questions)
                      .ThenInclude(q => q.Options)
                      .FirstOrDefault(q => q.Id == id);

            return _mapper.Map<DisplayQuizzDto>(quizz);
        }

        public QuizzDto UpdateQuizz(int id, QuizzDto updatedQuizz)
        {
            throw new NotImplementedException();
        }

        public List<Theme> GetThemesByIds(List<int> ids)
        {
            List<Theme> themes = _dbContext.Themes.Where(t => ids.Contains(t.Id)).ToList();
            return themes;
        }

        public int GetMaxScore(List<QuestionDto> questions)
        {

            int score = questions.Sum(q => q.Points);
            return score;
        }





        public List<QuestionDto> GetQuestionsForIds(List<int> ids)
        {
            //  var questions =  _dbContext.Questions.Where(q => ids.Contains(q.Id));
            var questions = _dbContext.Questions
      .Where(q => ids.Contains(q.Id))
      .Include(q => q.Options) 
      .ToList();
            // ako bude trebalo i za themes
            return _mapper.Map<List<QuestionDto>>(questions);
        }

    }
}
