using AutoMapper;
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

        public bool DeleteQuestion(int id)
        {
            throw new NotImplementedException();
        }

        public List<QuestionDto> GetAllQuestions()
        {
            throw new NotImplementedException();
        }

        public QuestionDto GetQuestionById(int id)
        {
            throw new NotImplementedException();
        }

        public QuestionDto UpdateQuestion(int id, QuestionDto updatedQuestion)
        {
            throw new NotImplementedException();
        }
    }
}
