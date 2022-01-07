using API.Models;

namespace API.Data
{
    public interface IPostRepository
    {
        Task<Post> CreateAsync(Post post, IFormFile formFile);
        Task DeleteByIdAsync(string id);
        Task<List<Post>> GetAsync();
        Task<Post> GetByIdAsync(string id);
    }
}