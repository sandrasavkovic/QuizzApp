using MyProjectBackend.Models;
namespace MyProjectBackend.Dto.Quizz
{
    public class BasicQuizzInfoDto
    {
        public string Title { get; set; }

        public string Description { get; set; }

        public int QuestionCount{ get; set; }    
        public DifficultyLevel Difficulty {get; set; }

        public int TimeLimit { get; set; } 



    }
}
