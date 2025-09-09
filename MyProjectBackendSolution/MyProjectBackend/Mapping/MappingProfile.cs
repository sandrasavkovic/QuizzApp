using AutoMapper;
using MyProjectBackend.Dto.User;
using MyProjectBackend.Models;

namespace MyProjectBackend.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserDto>().ReverseMap(); //Kazemo mu da mapira User na UserDto i obrnuto

        }
    }
}
