using MyProjectBackend.Dto.Quizz;

namespace MyProjectBackend.Dto.Results
{
    public class UserResultsDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }

        public int QuizzId { get; set; }

        public string QuizzName { get; set; }

        public DateTime AttemptDate { get; set; }

        public int Score { get; set; }

        // dodato
        public int TotalQuestionsCount { get; set; }

        public int CorrectAnswersCount { get; set; }

        public double Percentage { get; set; }

        public int TimeTaken { get; set; }

        public List<UserAnswerDto> Answers { get; set; } = new();

    }
}
