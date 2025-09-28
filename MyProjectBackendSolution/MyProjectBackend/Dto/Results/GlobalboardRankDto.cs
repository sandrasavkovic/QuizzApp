namespace MyProjectBackend.Dto.Results
{
    public class GlobalboardRankDto
    {
 
        public string Username { get; set; }


        public string QuizzName { get; set; }


        public int BestTime { get; set; }
        public DateTime AttemptDate { get; set; }

        public int BestScore { get; set; }

        public int TotalAttempts { get; set; }

    }
}
