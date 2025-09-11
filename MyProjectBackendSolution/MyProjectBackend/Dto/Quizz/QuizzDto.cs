using MyProjectBackend.Models;

namespace MyProjectBackend.Dto.Quizz
{
    public class QuizzDto
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }
        public int TimeLimit { get; set; } // u sekundama

        public int MaxScore { get; set; }

        public DifficultyLevel Difficulty { get; set; } // Easy, Medium, Hard

        public List<MyProjectBackend.Models.Theme> Themes { get; set; } = new();
    }
}
