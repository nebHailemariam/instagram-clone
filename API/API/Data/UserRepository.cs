using API.Dtos;
using API.Helpers;
using API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using System.Net;

namespace API.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly IMapper _mapper;
        private readonly UserManager<ApplicationUser> _userManager;

        public UserRepository(IMapper mapper, UserManager<ApplicationUser> userManager)
        {
            _mapper = mapper;
            _userManager = userManager;
        }

        public async Task AddRoleAsync(ApplicationUser user, string role)
        {
            var result = await _userManager.AddToRoleAsync(user, "User");
            if (!result.Succeeded)
            {
                throw new AppException("Internal server error", detail: string.Join(",", result.Errors.ToString().ToArray()), statusCode: HttpStatusCode.InternalServerError);
            }
            return;
        }

        public async Task<bool> CheckPasswordAsync(ApplicationUser user, string password)
        {
            return await _userManager.CheckPasswordAsync(user, password);
        }

        public async Task<ApplicationUser> CreateAsync(ApplicationUser user, string password)
        {
            user.Id = Guid.NewGuid().ToString(); ;
            user.CreatedAt = DateTime.UtcNow;
            var result = await _userManager.CreateAsync(user, password);

            if (!result.Succeeded)
            {
                throw new AppException("Internal server error", detail: string.Join(",", result.Errors.ToString().ToArray()), statusCode: HttpStatusCode.InternalServerError);
            }
            return user;
        }

        public async Task<bool> IsEmailTakenAsync(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return false;
            }
            return true;
        }

        public async Task<ApplicationUser> GetByEmailAsync(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                throw new AppException("Account not found", statusCode: HttpStatusCode.NotFound);
            }
            return user;
        }

        public async Task<ApplicationUser> GetByIdAsync(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                throw new AppException("Account not found", statusCode: HttpStatusCode.NotFound);
            }
            return user;
        }

        public async Task<UserDto> GetProfileAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                throw new AppException("Account not found", statusCode: HttpStatusCode.NotFound);
            }
            return _mapper.Map<UserDto>(user);
        }

        public async Task<IList<string>> GetRolesAsync(ApplicationUser user)
        {
            return await _userManager.GetRolesAsync(user);
        }

        public async Task UpdatePassword(string userId, string password)
        {
            var user = await GetByIdAsync(userId);

            user.PasswordHash = _userManager.PasswordHasher.HashPassword(user, password);
            user.PasswordChangeAt = DateTime.UtcNow;

            var result = await _userManager.UpdateAsync(user);

            if (!result.Succeeded)
            {
                throw new AppException("Internal server Error", statusCode: HttpStatusCode.InternalServerError);
            }
        }
    }
}