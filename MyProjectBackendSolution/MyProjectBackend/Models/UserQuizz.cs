using System.ComponentModel.DataAnnotations.Schema;

namespace MyProjectBackend.Models
{
    public class UserQuizz
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        [ForeignKey("UserId")]
        public User User { get; set; }

        public int QuizzId { get; set; }
        [ForeignKey("QuizzId")]
        public Quizz Quizz { get; set; }

        public DateTime AttempDate{ get; set; }
        
        public int Score{get; set; }
        
        public int TotalQuestionsCount { get; set; }

        public int CorrectAnswersCount { get; set; }    
       public double Percentage{get; set; } //quizz.MaxScore/Score * 100

        public int TimeTaken{get; set; }

        public List<UserAnswer> Answers { get; set; } = new();

    }
}
