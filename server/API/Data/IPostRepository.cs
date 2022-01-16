using API.Helpers;
using API.Models;

namespace API.Data
{
    public interface IPostRepository
    {
        Task<Post> CreateAsync(Post post, IFormFile formFile);
        Task DeleteByIdAsync(string id);
        Task<PagedList<Post>> GetAsync(QueryStringParameters queryStringParameters);
        Task<Post> GetByIdAsync(string id);
    }
}