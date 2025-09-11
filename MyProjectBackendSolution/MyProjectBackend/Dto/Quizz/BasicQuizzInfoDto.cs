using MyProjectBackend.Models;
namespace MyProjectBackend.Dto.Quizz
{
    public class BasicQuizzInfoDto
    {
        public int Id{get; set; }
        public string Title { get; set; }

        public string Description { get; set; }

        public List<MyProjectBackend.Models.Theme> Themes { get; set; }
        public int QuestionCount{ get; set; }    
        public DifficultyLevel Difficulty {get; set; }

        public int TimeLimit { get; set; } 



    }
}
