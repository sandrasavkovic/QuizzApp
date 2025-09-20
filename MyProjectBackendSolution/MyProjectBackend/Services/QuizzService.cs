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

            bool attempted = _dbContext.UserQuizzs.Any(q => q.QuizzId == id);


            if (attempted)
            {
                return false;
            }

            var quizz = _dbContext.Quizzes.FirstOrDefault(q => q.Id == id);
            if (quizz == null) return false;

            _dbContext.Quizzes.Remove(quizz);
            _dbContext.SaveChanges();
            return true;
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
            bool attempted = _dbContext.UserQuizzs.Any(q=> q.QuizzId == id);
           

            if (attempted)
            {
                return null; 
            }
           // Quizz quizz = _dbContext.Quizzes.Find(id);
            var quizz = _dbContext.Quizzes
                .Include(q => q.Questions) 
                .ThenInclude(q => q.Options) 
                .Include(q => q.Themes)     
                .FirstOrDefault(q => q.Id == id);

            if (quizz == null)
                return null; // kviz ne postoji

            quizz.Title = updatedQuizz.Title;
            quizz.Description = updatedQuizz.Description;
            quizz.TimeLimit = updatedQuizz.TimeLimit;
            quizz.Difficulty = updatedQuizz.Difficulty;
            // sa fronta saljem ideve, moram dodati prave objekte Question i Theme
            if (updatedQuizz.QuestionIds != null && updatedQuizz.QuestionIds.Any())
            {
                // trenutna pitanja u kvizu
                var currentQuestions = quizz.Questions.ToList();

                // ukloni pitanja koja više nisu selektovana
                foreach (var q in currentQuestions)
                {
                    if (!updatedQuizz.QuestionIds.Contains(q.Id))
                    {
                        quizz.Questions.Remove(q);
                    }
                }

                // dodaj nova pitanja koja još nisu u kvizu
                foreach (var qId in updatedQuizz.QuestionIds)
                {
                    if (!currentQuestions.Any(cq => cq.Id == qId))
                    {
                        var question = _dbContext.Questions.Find(qId);
                        if (question != null)
                            quizz.Questions.Add(question);
                    }
                }
            }
            else
            {
                quizz.Questions.Clear();
            }


            if (updatedQuizz.ThemeIds != null && updatedQuizz.ThemeIds.Any())
            {
                quizz.Themes = _dbContext.Themes
                    .Where(t => updatedQuizz.ThemeIds.Contains(t.Id))
                    .ToList();
            }
            else
            {
                quizz.Themes.Clear();
            }

            _dbContext.SaveChanges();

            return _mapper.Map<QuizzDto>(quizz);
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
