using API.Domain.Enums;
using API.Dtos;
using API.Helpers;
using API.Models;
using API.Services;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace API.Data
{
    public class PostRepository : IPostRepository
    {
        private readonly ICloudinaryService _cloudinaryService;
        private readonly DataContext _context;
        private readonly IServiceProvider _serviceProvider;

        public PostRepository(ICloudinaryService cloudinaryService, DataContext context, IServiceProvider serviceProvider)
        {
            _cloudinaryService = cloudinaryService;
            _context = context;
            _serviceProvider = serviceProvider;
        }

        public async Task<Post> CreateAsync(Post post, IFormFile file)
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
                        post = await _cloudinaryService.Upload(post, file);

                        post.Id = Guid.NewGuid().ToString();
                        post.CreatedAt = DateTime.UtcNow;

                        var createdPost = await context.Posts.AddAsync(post);
                        await context.SaveChangesAsync();

                        transaction.Commit();
                        return post;
                    }
                    catch (Exception err)
                    {
                        transaction.Rollback();
                        if (err is AppException)
                        {
                            throw;
                        }
                        throw new AppException("Internal server error", detail: err.ToString(), statusCode: HttpStatusCode.InternalServerError);
                    }
                });
            }
            return post;
        }

        public Task DeleteByIdAsync(string id)
        {
            throw new NotImplementedException();
        }

        public async Task<PagedList<Post>> GetAsync(QueryStringParameters queryStringParameters)
        {
            return await PagedList<Post>.ToPagedList(_context.Posts.Include(p => p.ApplicationUser).OrderByDescending(p => p.CreatedAt),
                queryStringParameters.PageNumber,
                queryStringParameters.PageSize);
        }

        public async Task<Post> GetByIdAsync(string id)
        {
            var post = await _context.Posts.Include(p => p.ApplicationUser).SingleOrDefaultAsync(a => a.Id == id);
            if (post == null)
            {
                throw new AppException("Post not found", statusCode: HttpStatusCode.NotFound);
            }
            return post;
        }
    }
}