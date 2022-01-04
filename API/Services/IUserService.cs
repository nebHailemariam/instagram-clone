using API.Dtos;
using API.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace API.Services
{
    public interface IUserService
    {
        Task<string> LoginAsync(UserLoginDto userLoginDto);
        SigningCredentials GetSigningCredentials();
        JwtSecurityToken GenerateTokenOptions(SigningCredentials signingCredentials, List<Claim> claims);
        Task<List<Claim>> GetClaimsAsync(ApplicationUser user);
        Task<UserDto> RegisterAsync(UserRegistrationDto userRegistrationDto);
        Task UpdatePassword(string userId, string password);
    }
}