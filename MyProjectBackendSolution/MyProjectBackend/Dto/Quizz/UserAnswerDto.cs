using System.ComponentModel.DataAnnotations.Schema;

namespace MyProjectBackend.Dto.Quizz
{
    public class UserAnswerDto
    {
        public int QuestionId { get; set; }
     
        public string? Answer { get; set; } // korisnikov odgovor (text ili JSON za MultipleChoice)

        public bool IsCorrect { get; set; } // da li je odgovor tačan
    }
}
