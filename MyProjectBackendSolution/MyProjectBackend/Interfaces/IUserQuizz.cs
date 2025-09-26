using Microsoft.EntityFrameworkCore;
using MyProjectBackend.Dto.Question;
using MyProjectBackend.Dto.Quizz;
using MyProjectBackend.Dto.Results;
using MyProjectBackend.Models;

namespace MyProjectBackend.Interfaces
{
    public interface IUserQuizz
    {
        UserQuizzDto AddUserQuizz(UserQuizz newUserQuizz);

        List<UserQuizzDto> GetAllUserQuizzes();

        List<UserResultsDto> GetUserQuizzsById(int id);

        //UserQuizzDto GetUserQuizById(int id);
        UserQuizzDto GetQuizResult(int userQuizzId);

        List<QuizzQuestionsDto> GetQuestionsForQuizz(int quizzId);

        QuizzDto GetQuizzById(int quizzId);

        List<GlobalboardDto> GetLeaderboard(int quizzId);

        List<GlobalboardRankDto> GetGlobalboard();

        List<GlobalboardDto> GetAllUserResults();

    }
}
