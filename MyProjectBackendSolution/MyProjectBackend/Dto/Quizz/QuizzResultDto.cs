namespace MyProjectBackend.Dto.Quizz
{
    public class QuizzResultDto
    {
        public MyProjectBackend.Models.Quizz Quiz { get; set; }       // kompletan kviz
        public UserQuizzDto Result { get; set; } // rezultat korisnika
    }
}
