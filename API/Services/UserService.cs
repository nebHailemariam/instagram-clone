using API.Data;
using API.Dtos;
using API.Helpers;
using API.Models;
using AutoMapper;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;

namespace API.Services
{
    public class UserService : IUserService
    {
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;
        public UserService(
            IConfiguration configuration,
            IMapper mapper,
            IUserRepository userRepository)
        {
            _configuration = configuration;
            _mapper = mapper;
            _userRepository = userRepository;
        }

        public async Task<string> LoginAsync(UserLoginDto userLoginDto)
        {
            var user = await _userRepository.GetByEmailAsync(userLoginDto.Email);
            if (!await _userRepository.CheckPasswordAsync(user, userLoginDto.Password))
            {
                throw new AppException("Password doesn't match", statusCode: HttpStatusCode.BadRequest);
            }

            var signingCredentials = GetSigningCredentials();
            var claims = await GetClaimsAsync(user);
            var tokenOptions = GenerateTokenOptions(signingCredentials, claims);
            var token = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
            return token;
        }

        public JwtSecurityToken GenerateTokenOptions(SigningCredentials signingCredentials, List<Claim> claims)
        {
            var jwtSettings = _configuration.GetSection("JWTSettings");
            var tokenOptions = new JwtSecurityToken(
            issuer: jwtSettings.GetSection("validIssuer").Value,
            audience: jwtSettings.GetSection("validAudience").Value,
            claims: claims,
            expires: DateTime.Now.AddMinutes(Convert.ToDouble(jwtSettings.GetSection("expiryInMinutes").Value)),
            signingCredentials: signingCredentials);
            return tokenOptions;
        }

        public async Task<List<Claim>> GetClaimsAsync(ApplicationUser user)
        {
            var claims = new List<Claim>
            {
             new Claim("id", user.Id), new Claim(ClaimTypes.Email, user.Email)
            };
            var roles = await _userRepository.GetRolesAsync(user);
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }
            return claims;
        }

        public SigningCredentials GetSigningCredentials()
        {
            var jwtSettings = _configuration.GetSection("JWTSettings");
            var key = Encoding.UTF8.GetBytes(jwtSettings.GetSection("securityKey").Value);
            var secret = new SymmetricSecurityKey(key);
            return new SigningCredentials(secret, SecurityAlgorithms.HmacSha256);
        }

        public async Task<UserDto> RegisterAsync(UserRegistrationDto userRegistrationDto)
        {
            if (userRegistrationDto.Password.Length < 6)
            {
                throw new AppException("Password length must be greater than 6 characters", statusCode: HttpStatusCode.BadRequest);
            }
            if (await _userRepository.IsEmailTakenAsync(userRegistrationDto.Email))
            {
                throw new AppException("Email is already registered", statusCode: HttpStatusCode.BadRequest);
            }
            var user = _mapper.Map<ApplicationUser>(userRegistrationDto);
            user.UserName = user.Email;
            await _userRepository.CreateAsync(user, userRegistrationDto.Password);
            await _userRepository.AddRoleAsync(user, RoleConstants.USER_ROLE);

            return _mapper.Map<UserDto>(user);
        }

        public async Task UpdatePassword(string userId, string password)
        {
            await _userRepository.UpdatePassword(userId, password);
        }
    }
}