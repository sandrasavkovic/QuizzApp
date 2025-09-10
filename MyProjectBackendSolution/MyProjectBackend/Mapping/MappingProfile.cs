using AutoMapper;
using MyProjectBackend.Dto.Question;
using MyProjectBackend.Dto.Quizz;
using MyProjectBackend.Dto.Theme;
using MyProjectBackend.Dto.User;
using MyProjectBackend.Models;

namespace MyProjectBackend.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserDto>().ReverseMap(); //Kazemo mu da mapira User na UserDto i obrnuto
            CreateMap<Quizz, QuizzDto>().ReverseMap();
            CreateMap<Option, OptionDto>().ReverseMap();
            CreateMap<Question, QuestionDto>().ReverseMap();
            CreateMap<Theme, ThemeDto>().ReverseMap();

        }
    }
}
