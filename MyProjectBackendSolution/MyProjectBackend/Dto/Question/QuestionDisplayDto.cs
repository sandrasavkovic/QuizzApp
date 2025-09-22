using MyProjectBackend.Models;

namespace MyProjectBackend.Dto.Question
{
    public class QuestionDisplayDto
    {
        public int Id { get; set; }
        public string Text { get; set; }

        public int ThemeId { get; set; }  

        public string ThemeName { get; set; }

        public QuestionType Type { get; set; }

        public int Points { get; set; }

        public List<OptionDto>? Options { get; set; } = new(); // ? jer se salje za sinle i multiple choice, za true false se koristi correct answer

        public string? CorrectAnswer { get; set; } // Za FillInTheBlank ili TrueFalse
    }
}
