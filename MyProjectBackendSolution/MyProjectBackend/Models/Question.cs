using System.ComponentModel.DataAnnotations.Schema;

namespace MyProjectBackend.Models
{
    public enum QuestionType
    {
        SingleChoice,
        MultipleChoice,
        TrueFalse,
        FillInTheBlank
    }
    public class Question
    {
        public int Id { get; set; }

        public string Text { get; set; }


        
        // FK na kviz
        /*
        public int QuizzId { get; set; }
        [ForeignKey("QuizzId")]
        public Quizz Quizz { get; set; }
        
        **/

        // fk na temu
        public int ThemeId { get; set; }


        [ForeignKey("ThemeId")]
        public Theme Theme { get; set; }


        public int Points { get; set; }

        public QuestionType Type { get; set; }

        // opcije
        public List<Option> Options { get; set; } = new();

        public string? CorrectAnswer { get; set; } // za FillInTheBlank ili true/false
    }
}
