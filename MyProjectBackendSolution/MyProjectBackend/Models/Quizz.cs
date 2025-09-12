namespace MyProjectBackend.Models
{
    public enum DifficultyLevel
    {
        Easy,
        Medium,
        Hard
    }
    public class Quizz
    {

        public int Id { get; set; }


        public string Title { get; set; }

        public string Description { get; set; } 

        // ima teme
        public List<Theme> Themes { get; set; } = new();
        // pitanaja realizujem pomocu veze s temom

        public List<Question> Questions { get; set; } = new();

        public int TimeLimit { get; set; } // u sekundama

        public int MaxScore { get; set; }

        public DifficultyLevel Difficulty {get; set; }

    }
}
