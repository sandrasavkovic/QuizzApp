using MyProjectBackend.Models;

namespace MyProjectBackend.Dto.Quizz
{
    public class CreateQuizzDto
    {

        public string Title { get; set; }

        public int TimeLimit { get; set; } // u sekundama

        public string Description { get; set; }

  
        public DifficultyLevel Difficulty { get; set; } // Easy, Medium, Hard


       public List<int> ThemeIds { get; set; } = new();
    }
}
