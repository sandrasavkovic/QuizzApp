using System.ComponentModel.DataAnnotations.Schema;

namespace MyProjectBackend.Models
{
    public class UserAnswer
    {
        public int Id { get; set; }

        public int UserQuizzResultId { get; set; } // FK na UserQuizResult
        [ForeignKey("UserQuizzResultId")]
        public UserQuizz UserQuizzResult { get; set; }

        public int QuestionId { get; set; } // FK na Question
        [ForeignKey("QuestionId")]
        public Question Question { get; set; }

        public string? Answer { get; set; } // korisnikov odgovor (text ili JSON za MultipleChoice)

        public bool IsCorrect { get; set; } // da li je odgovor tačan
    }
}
