using MyProjectBackend.Dto.User;

namespace MyProjectBackend.Interfaces
{
    public interface IUserService
    {
        List<UserDto> GetAllUsers();
        UserDto GetUserById(int id);

        UserDto AddUser(UserDto newUser);

        UserDto UpdateUser(int id, UserDto userDto);

        UserDto GetUserByUsername(string username);

        bool DeleteUser(int id);
    }
}
