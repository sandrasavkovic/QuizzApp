namespace MyProjectBackend.Models
{
    public class Theme
    {
        public int Id { get; set; }

        public string Name { get; set; }


        // ima pitanja
        public List<Question> Questions { get; set; } = new();

        //public int QuizzId { get; set; }

        //public Quizz Quizz { get; set; }

       
    }
}
