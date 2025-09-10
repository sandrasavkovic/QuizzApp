using Microsoft.EntityFrameworkCore;

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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            //Kazemo mu da pronadje sve konfiguracije u Assembliju i da ih primeni nad bazom
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
        }
    }
}
