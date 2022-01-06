using API.Dtos;
using API.Models;

namespace API.Data
{
    public interface IUserRepository
    {
        Task AddRoleAsync(ApplicationUser user, string role);
        Task<bool> CheckPasswordAsync(ApplicationUser user, string password);
        Task<ApplicationUser> CreateAsync(ApplicationUser user, string password);
        Task<bool> IsEmailTakenAsync(string email);
        Task<ApplicationUser> GetByEmailAsync(string email);
        Task<ApplicationUser> GetByIdAsync(string id);
        Task<UserDto> GetProfileAsync(string userId);
        Task<IList<string>> GetRolesAsync(ApplicationUser user);
        Task UpdatePassword(string userId, string password);
    }
}
