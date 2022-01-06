using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

namespace API.Services
{
    public class CloudinaryService : ICloudinaryService
    {
        private readonly Cloudinary _cloudinary;
        public CloudinaryService(
            IConfiguration configuration)
        {
            _cloudinary = new Cloudinary(new Account(
                configuration.GetConnectionString("Cloudinary:Cloud"), configuration.GetConnectionString("Cloudinary:ApiKey"), configuration.GetConnectionString("Cloudinary:ApiSecret")));
        }

        public async Task<string> UploadPicture(IFormFile file)
        {
            _cloudinary.Api.Secure = true;
            Stream fileStream = file.OpenReadStream();

            var uploadParams = new ImageUploadParams()
            {
                File = new FileDescription(file.FileName, fileStream),
                Folder = "PostAPI/img"
            };

            var uploadResult = await _cloudinary.UploadAsync(uploadParams);
            return uploadResult.SecureUrl.AbsoluteUri;
        }

        public async Task<string> UploadVideo(IFormFile file)
        {
            _cloudinary.Api.Secure = true;
            Stream fileStream = file.OpenReadStream();

            var uploadParams = new VideoUploadParams()
            {
                File = new FileDescription(file.FileName, fileStream),
                Folder = "PostAPI/video"
            };

            var uploadResult = await _cloudinary.UploadAsync(uploadParams);
            return uploadResult.SecureUrl.AbsoluteUri;
        }
    }
}