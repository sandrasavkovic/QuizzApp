using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MyProjectBackend.Dto.Question;
using MyProjectBackend.Infrastructure;
using MyProjectBackend.Interfaces;
using MyProjectBackend.Models;

namespace MyProjectBackend.Services
{
    public class QuestionService : IQuestionService
    {

        private readonly IMapper _mapper;
        private readonly AppDbContext _dbContext;

        public QuestionService(IMapper mapper, AppDbContext dbContext)
        {
            _mapper = mapper;
            _dbContext = dbContext;
        }

        public QuestionDto AddQuestion(QuestionDto newQuestion)
        {

            Question question = _mapper.Map<Question>(newQuestion);
            //Theme theme = _dbContext.Themes.Where(t=>t.Id == question.ThemeId).FirstOrDefault();
           // question.Theme = theme;
            _dbContext.Questions.Add(question);
            _dbContext.SaveChanges();
            return _mapper.Map<QuestionDto>(question);
         // return question;
        }


        // pitanje cemo brisati samo ako se ne sadrzi ni u jednom vec radjenom kvizu
        // ideja : uzmi kvizove koji se nalaze u UserQuizzs (po id-u), to su radjeni kvizovi
        // prodji kroz te kvizove i ukoliko oni imaju pitanje sa id-em prosledjenom delete funkciji, ne mozes ih obrisati
        public bool DeleteQuestion(int id)
        {
            // ucitaj sve kvizove koje su korisnici radili, zajedno sa njihovim pitanjima
            var quizzes = _dbContext.UserQuizzs
                .Select(uq => uq.QuizzId)
                .Distinct()
                .ToList();

            var usedQuizzes = _dbContext.Quizzes
                .Where(q => quizzes.Contains(q.Id))
                .Include(q => q.Questions) // obavezno!
                .ToList();

            // Proveri da li pitanje postoji u nekom od tih kvizova
            bool existsInQuizzes = usedQuizzes
                .Any(q => q.Questions.Any(qq => qq.Id == id));

            if (existsInQuizzes)
            {
                return false; // ne dozvoli brisanje
            }

            var question = _dbContext.Questions.FirstOrDefault(q => q.Id == id);
            if (question == null) return false;

            _dbContext.Questions.Remove(question);
            _dbContext.SaveChanges();
            return true;
        }



        public List<QuizzQuestionsDto> GetAllQuestions()
        {
            var questions = _dbContext.Questions
              .Include(q => q.Options)   // uključujemo Options
              .Include(q => q.Theme)     // uključujemo Theme
                .ToList();
            return _mapper.Map<List<QuizzQuestionsDto>>(questions);
        }

        public QuestionDto GetQuestionById(int id)
        {
            throw new NotImplementedException();
        }

        public QuizzQuestionsDto UpdateQuestion(int id, QuizzQuestionsDto updatedQuestion)
        {
            Question question = _dbContext.Questions.Find(id);
            question.Text = updatedQuestion.Text;
            Theme theme = _dbContext.Themes.Where(t=>t.Id == updatedQuestion.ThemeId).FirstOrDefault();
            question.Theme = theme;
            question.Options = _mapper.Map<List<Option>>(updatedQuestion.Options);
            question.Points = updatedQuestion.Points;
            question.Type = updatedQuestion.Type;
            question.CorrectAnswer = updatedQuestion.CorrectAnswer;
            _dbContext.SaveChanges();

            return _mapper.Map<QuizzQuestionsDto>(question);
        }
        /*
           public ThemeDto UpdateTheme(int id, ThemeDto updatedTheme)
        {
            Theme theme = _dbContext.Themes.Find(id);
            theme.Name = updatedTheme.Name;
            _dbContext.SaveChanges();
            return _mapper.Map<ThemeDto>(theme);
        }
         */
    }
}
