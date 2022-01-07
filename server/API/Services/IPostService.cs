using API.Dtos;
using API.Models;

namespace API.Services
{
    public interface IPostService
    {
        Task<Post> CreateAsync(PostCreateDto postCreateDto, string currentUserId);
    }
}