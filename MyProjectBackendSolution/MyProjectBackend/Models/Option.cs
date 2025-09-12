namespace MyProjectBackend.Models
{
   
    public class Option
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public bool IsCorrect { get; set; }

        // pripada 1 pitanju
       // public int QuestionId { get; set; }

     //   public Question Question { get; set; }

        // npr koji je gl grad francuske Id=1, text:pariz, isCorrect=true
    }
}
