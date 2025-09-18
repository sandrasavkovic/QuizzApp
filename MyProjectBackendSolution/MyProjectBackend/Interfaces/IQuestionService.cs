using MyProjectBackend.Dto.Question;
using MyProjectBackend.Dto.Quizz;
using MyProjectBackend.Models;

namespace MyProjectBackend.Interfaces
{
    public interface IQuestionService
    {
        List<QuizzQuestionsDto> GetAllQuestions();
        QuestionDto GetQuestionById(int id);

        QuestionDto AddQuestion(QuestionDto newQuestion);

        QuizzQuestionsDto UpdateQuestion(int id, QuizzQuestionsDto updatedQuestion);



        bool DeleteQuestion(int id);
    }
}
