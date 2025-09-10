using MyProjectBackend.Dto.Question;
using MyProjectBackend.Dto.Theme;
using MyProjectBackend.Models;

namespace MyProjectBackend.Interfaces
{
    public interface IThemeService
    {
        List<ThemeDto> GetAllThemes();
        ThemeDto GetThemeById(int id);

        ThemeDto AddTheme(ThemeDto newTheme);

        ThemeDto UpdateTheme(int id, ThemeDto updatedTheme);



        bool DeleteTheme(int id);
    }
}
