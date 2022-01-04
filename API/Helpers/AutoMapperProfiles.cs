using API.Dtos;
using API.Models;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<UserRegistrationDto, ApplicationUser>().ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.FirstName));
            CreateMap<ApplicationUser, UserDto>();
        }
    }
}