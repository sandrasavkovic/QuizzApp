using MyProjectBackend.Dto.Quizz;

namespace MyProjectBackend.Dto.Results
{
    public class GlobalboardDto
    {

        public int Id { get; set; }
        public int UserId { get; set; }

        public string Username { get; set; }

        public int QuizzId { get; set; }

        public string QuizzName { get; set; }


        public DateTime AttemptDate { get; set; }

        public int Score { get; set; }

      
        public int TimeTaken { get; set; }

       
    }
}
