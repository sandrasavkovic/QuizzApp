using MyProjectBackend.Models;

namespace MyProjectBackend.Dto.Quizz
{
    public class QuizzDto
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public int TimeLimit { get; set; } // u sekundama

        public int MaxScore { get; set; }

        public string Difficulty { get; set; } // Easy, Medium, Hard

        public List<Theme> Themes { get; set; } = new();
    }
}
