using API.Dtos;
using API.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace API.Services
{
    public interface ICloudinaryService
    {
        public Task<string> UploadVideo(IFormFile file);
        public Task<string> UploadPicture(IFormFile file);
    }
}