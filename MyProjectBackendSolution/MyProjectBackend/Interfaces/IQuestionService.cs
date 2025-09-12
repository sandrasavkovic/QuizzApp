using MyProjectBackend.Dto.Question;
using MyProjectBackend.Dto.Quizz;
using MyProjectBackend.Models;

namespace MyProjectBackend.Interfaces
{
    public interface IQuestionService
    {
        List<QuestionDto> GetAllQuestions();
        QuestionDto GetQuestionById(int id);

        Question AddQuestion(QuestionDto newQuestion);

        QuestionDto UpdateQuestion(int id, QuestionDto updatedQuestion);



        bool DeleteQuestion(int id);
    }
}
