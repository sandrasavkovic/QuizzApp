using MyProjectBackend.Dto.User;

namespace MyProjectBackend.Interfaces
{
    public interface IAuthService
    {
        string Authenticate(LoginUserDto loginUser);

    }
}
