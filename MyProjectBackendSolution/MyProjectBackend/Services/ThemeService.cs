using AutoMapper;
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
            _dbContext.SaveChanges();
            return _mapper.Map<ThemeDto>(theme);
          // return theme;
        }

        public bool DeleteTheme(int id)
        {
            throw new NotImplementedException();
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
            throw new NotImplementedException();
        }
    }
}
