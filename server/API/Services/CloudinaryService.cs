using System.Net;
using API.Domain.Enums;
using API.Helpers;
using API.Models;
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
                configuration["Cloudinary:Cloud"], configuration["Cloudinary:ApiKey"], configuration["Cloudinary:ApiSecret"]
            ));
        }

        public async Task<Post> Upload(Post post, IFormFile file)
        {
            if (file.ContentType.Contains("image"))
            {
                post.FileType = FileType.Picture;
                post.FileUrl = await UploadPicture(file);
                return post;
            }
            else if (file.ContentType.Contains("video"))
            {
                post.FileType = FileType.Video;
                post.FileUrl = await UploadVideo(file);
                return post;
            }
            throw new AppException("Invalid file type", statusCode: HttpStatusCode.BadRequest);
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