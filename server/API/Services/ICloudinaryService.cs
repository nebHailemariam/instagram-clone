using API.Models;

namespace API.Services
{
    public interface ICloudinaryService
    {
        public Task<Post> Upload(Post post, IFormFile file);
        public Task<string> UploadPicture(IFormFile file);
        public Task<string> UploadVideo(IFormFile file);
    }
}