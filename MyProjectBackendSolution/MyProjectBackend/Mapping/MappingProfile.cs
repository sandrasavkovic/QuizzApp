using AutoMapper;
using MyProjectBackend.Dto.Question;
using MyProjectBackend.Dto.Quizz;
using MyProjectBackend.Dto.Theme;
using MyProjectBackend.Dto.User;
using MyProjectBackend.Dto.Results;
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
            CreateMap<Question, QuizzQuestionsDto>().ReverseMap();  
            CreateMap<Quizz, DisplayQuizzDto>().ReverseMap();
            CreateMap<UserQuizz, UserQuizzDto>().ReverseMap();
            CreateMap<UserAnswer, UserAnswerDto>().ReverseMap();
            CreateMap<Theme, ThemeDto>().ReverseMap();
            CreateMap<UserQuizz, GlobalboardDto>()
                 .ForMember(dest => dest.Username, opt => opt.MapFrom(src => src.User.Username))
                 .ForMember(dest => dest.QuizzName, opt => opt.MapFrom(src => src.Quizz.Title));
            

            CreateMap<UserQuizz, UserResultsDto>()
                .ForMember(dest => dest.QuizzName, opt => opt.MapFrom(src => src.Quizz.Title))
                 .ReverseMap();
            CreateMap<UserQuizz, GlobalboardRankDto>()
                 .ForMember(dest => dest.Username, opt => opt.MapFrom(src => src.User.Username))
                 .ForMember(dest => dest.QuizzName, opt => opt.MapFrom(src => src.Quizz.Title))
                 .ForMember(dest => dest.BestTime, opt => opt.MapFrom(src => src.TimeTaken))
                 .ForMember(dest => dest.BestScore, opt => opt.MapFrom(src => src.Score))
                 .ForMember(dest => dest.TotalAttempts, opt => opt.Ignore());

        }

    }
}
