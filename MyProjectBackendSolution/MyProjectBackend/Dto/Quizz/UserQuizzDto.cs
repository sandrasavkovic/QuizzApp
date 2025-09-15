using MyProjectBackend.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyProjectBackend.Dto.Quizz
{
    public class UserQuizzDto
    {
    
        public int UserId { get; set; }

      
        public int QuizzId { get; set; }
       

        public DateTime AttemptDate { get; set; }

        public int Score { get; set; }

        public double Percentage { get; set; } 

        public int TimeTaken { get; set; }

        public List<UserAnswerDto> Answers { get; set; } = new();

    }
}
