namespace MyProjectBackend.Models
{
    public class Theme
    {
        public int Id { get; set; }

        public string Name { get; set; }


        public List<Question> Questions { get; set; } = new();

        public List<Quizz> Quizzes { get; set; } = new();

    }
}