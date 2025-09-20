using Microsoft.EntityFrameworkCore;
using MyProjectBackend.Models;

namespace MyProjectBackend.Infrastructure
{
    public class AppDbContext : DbContext
    {

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }
        // pravimo db setove za svaki entitet kog zelimo da mapiramo u bazu iz Models

        public DbSet<Models.User> Users { get; set; } // pravi tabelu users u bazi
        public DbSet<Models.Theme> Themes { get; set; }
        public DbSet<Models.Question> Questions { get; set; }
        public DbSet<Models.Option> Options { get; set; }
        public DbSet<Models.Quizz> Quizzes { get; set; }

        public DbSet<Models.UserAnswer> UserAnswers { get; set; }

        public DbSet<Models.UserQuizz> UserQuizzs { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            //Kazemo mu da pronadje sve konfiguracije u Assembliju i da ih primeni nad bazom
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
         
            // kad brisem temu brisu se i pitanja
            modelBuilder.Entity<Question>()
                 .HasOne(q => q.Theme)
                   .WithMany(t => t.Questions)
                     .HasForeignKey(q => q.ThemeId)
                    .OnDelete(DeleteBehavior.Cascade);
            // kad se brise kviz, brise se samo iz veze many to many tj questionquizz tabele, a pitanja ostaju
            modelBuilder.Entity<Quizz>()
                 .HasMany(q => q.Questions)
                 .WithMany(q => q.Quizzes)
                 .UsingEntity<Dictionary<string, object>>(
                 "QuestionQuizz",
                 j => j
                   .HasOne<Question>()
                  .WithMany()
                  .HasForeignKey("QuestionId")
                  .OnDelete(DeleteBehavior.Cascade), // kad obrišem kviz, veza nestaje
                  j => j
                   .HasOne<Quizz>()
                  .WithMany()
                  .HasForeignKey("QuizzId")
               .OnDelete(DeleteBehavior.Cascade)  // kad obrišem kviz, veza nestaje
               );
          }
    }
}
