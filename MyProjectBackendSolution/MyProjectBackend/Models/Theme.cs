namespace MyProjectBackend.Models
{
    public class Theme
    {
        public int Id { get; set; }

        public string Name { get; set; }


        // Tema može imati više pitanja
        public List<Question> Questions { get; set; } = new();

    }
}