using API.Dtos;
using API.Helpers;
using API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace API.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IServiceProvider _serviceProvider;
        private readonly UserManager<ApplicationUser> _userManager;

        public UserRepository(
            DataContext context,
            IMapper mapper,
            IServiceProvider serviceProvider,
            UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _mapper = mapper;
            _serviceProvider = serviceProvider;
            _userManager = userManager;
        }

        public async Task AddRoleAsync(ApplicationUser user, string role)
        {
            var result = await _userManager.AddToRoleAsync(user, role);
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

        public async Task<ApplicationUser> CreateAsync(ApplicationUser user, string password, string role)
        {

            using (var scope = _serviceProvider.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<DataContext>();
                var strategy = context.Database.CreateExecutionStrategy();
                await strategy.Execute(async () =>
                {
                    using var transaction = context.Database.BeginTransaction();
                    try
                    {
                        user.Id = Guid.NewGuid().ToString();
                        user.UserName = user.Email;
                        user.NormalizedUserName = user.UserName.ToUpper();
                        user.NormalizedEmail = user.Email.ToUpper();

                        // Hash password.
                        user.SecurityStamp = Guid.NewGuid().ToString();
                        user.PasswordHash = _userManager.PasswordHasher.HashPassword(user, password);

                        user.CreatedAt = DateTime.UtcNow;

                        var createApplicationUser = await context.Users.AddAsync(user);
                        await context.SaveChangesAsync();

                        var userRole = new IdentityUserRole<string>()
                        {
                            UserId = user.Id,
                            RoleId = (await GetApplicationRoleByName(role)).Id
                        };
                        var createdUserRole = await context.UserRoles.AddAsync(userRole);
                        await context.SaveChangesAsync();

                        transaction.Commit();
                        return user;
                    }
                    catch (Exception err)
                    {
                        transaction.Rollback();
                        throw new AppException("Internal server error", detail: err.ToString(), statusCode: HttpStatusCode.InternalServerError);
                    }
                });
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

        public async Task<IdentityRole<string>> GetApplicationRoleByName(string roleName)
        {
            var role = await _context.Roles.SingleOrDefaultAsync(r => r.Name == roleName);
            if (role == null)
            {
                throw new AppException("Role not found", detail: $"Role with name {roleName} not found", statusCode: HttpStatusCode.NotFound);
            }
            return role;
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