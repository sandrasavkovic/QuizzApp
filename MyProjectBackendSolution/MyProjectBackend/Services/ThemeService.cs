using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MyProjectBackend.Dto.Theme;
using MyProjectBackend.Infrastructure;
using MyProjectBackend.Interfaces;
using MyProjectBackend.Models;

namespace MyProjectBackend.Services
{
    public class ThemeService : IThemeService
    {
        private readonly IMapper _mapper;
        private readonly AppDbContext _dbContext;

        public ThemeService(IMapper mapper, AppDbContext context)
        { 
            _mapper = mapper;
            _dbContext = context;
        }
        public ThemeDto AddTheme(ThemeDto newTheme)
        {
            Theme theme = _mapper.Map<Theme>(newTheme);
            _dbContext.Themes.Add(theme);
            try
            {
                _dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                var inner = ex.InnerException?.Message;
                throw new Exception("Error while trying to add theme: " + ex.Message, ex);
            }
            return _mapper.Map<ThemeDto>(theme);
          // return theme;
        }

        public bool DeleteTheme(int id)
        {
            // Temu mozemo obrisati samo ako ne postoji uradjeni kviz sa tom temom
            var quizzes = _dbContext.UserQuizzs
               .Select(uq => uq.QuizzId)
               .Distinct()
               .ToList();

            var usedQuizzes = _dbContext.Quizzes
                .Where(q => quizzes.Contains(q.Id))
                .Include(q => q.Themes) 
                .ToList();

           
            bool existsInQuizzes = usedQuizzes
                .Any(q => q.Themes.Any(qt => qt.Id == id));

            
          //  bool hasQuestion = _dbContext.Questions.Where(q=>q.ThemeId == id).Any();

            if (existsInQuizzes)
            {
                return false; // ne dozvoli brisanje
            }

            Theme theme = _dbContext.Themes.Find(id);

            _dbContext.Themes.Remove(theme);

            try
            {
                _dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                var inner = ex.InnerException?.Message;
                throw new Exception("Error while trying to delete theme: " + ex.Message, ex);
            }
            return true;
        }

        public List<ThemeDto> GetAllThemes()
        {
            List<Theme>themes = _dbContext.Themes.ToList();   
            List<ThemeDto>themesDto = _mapper.Map<List<ThemeDto>>(themes);
            return themesDto;
        }

        public ThemeDto GetThemeById(int id)
        {
            throw new NotImplementedException();
        }

        public ThemeDto UpdateTheme(int id, ThemeDto updatedTheme)
        {
            var quizzes = _dbContext.UserQuizzs
              .Select(uq => uq.QuizzId)
              .Distinct()
              .ToList();

            var usedQuizzes = _dbContext.Quizzes
                .Where(q => quizzes.Contains(q.Id))
                .Include(q => q.Themes)
                .ToList();


            bool existsInQuizzes = usedQuizzes
                .Any(q => q.Themes.Any(qt => qt.Id == id));

            if (existsInQuizzes)
            {
                return null;
            }
            Theme theme = _dbContext.Themes.Find(id);
            theme.Name = updatedTheme.Name;
            try
            {
                _dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                var inner = ex.InnerException?.Message;
                throw new Exception("Error while trying to update theme: " + ex.Message, ex);
            }
            return _mapper.Map<ThemeDto>(theme);
        }


    

    }
}
