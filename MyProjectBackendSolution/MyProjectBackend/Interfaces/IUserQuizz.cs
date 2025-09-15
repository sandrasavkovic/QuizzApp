using Microsoft.EntityFrameworkCore;
using MyProjectBackend.Dto.Quizz;
using MyProjectBackend.Models;

namespace MyProjectBackend.Interfaces
{
    public interface IUserQuizz
    {
        UserQuizzDto AddUserQuizz(UserQuizz newUserQuizz);

        List<UserQuizzDto> GetAllUserQuizzes();

        UserQuizzDto GetUserQuizzById(int id);
    }
}
