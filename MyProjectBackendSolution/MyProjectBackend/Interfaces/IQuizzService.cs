using MyProjectBackend.Dto.Quizz;
using MyProjectBackend.Dto.User;

namespace MyProjectBackend.Interfaces
{
    public interface IQuizzService
    {
        List<QuizzDto> GetAllQuizzes();
        QuizzDto GetQuizzById(int id);

        QuizzDto AddQuizz(QuizzDto newQuizz);

        QuizzDto UpdateQuizz(int id, QuizzDto updatedQuizz);

       

        bool DeleteQuizz(int id);
    }
}
