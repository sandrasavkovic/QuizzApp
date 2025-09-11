using MyProjectBackend.Dto.Quizz;
using MyProjectBackend.Dto.User;
using MyProjectBackend.Models;

namespace MyProjectBackend.Interfaces
{
    public interface IQuizzService
    {
        List<QuizzDto> GetAllQuizzes();

        List<BasicQuizzInfoDto> GetBasicQuizzes();
        QuizzDto GetQuizzById(int id);

        QuizzDto AddQuizz(QuizzDto newQuizz);

        QuizzDto UpdateQuizz(int id, QuizzDto updatedQuizz);

       

        bool DeleteQuizz(int id);
        public List<Theme> GetThemesByIds(List<int> ids);
        public int GetMaxScore(List<int> ids);
        public List<Question> GetQuestionsForQuizz(List<Theme> themes);


    }
}
