using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using MyProjectBackend.Models;

namespace MyProjectBackend.Infrastructure.Configurations
{
    public class UserQuizzConfiguration : IEntityTypeConfiguration<UserQuizz>
    {
        public void Configure(EntityTypeBuilder<UserQuizz> builder)
        {
            builder.HasKey(x => x.Id); //Podesavam primarni kljuc tabele

            builder.Property(x => x.Id).ValueGeneratedOnAdd(); //Kazem da ce se primarni kljuc
                                                               //automatski generisati prilikom dodavanja,
                                                               //redom 1 2 3...



        }
    }
}
