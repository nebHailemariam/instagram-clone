using API.Data;
using API.Dtos;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class PostsController : ControllerBase
    {
        private readonly IPostRepository _postRepository;
        private readonly IPostService _postService;

        public PostsController(IPostRepository postRepository, IPostService postService)
        {
            _postRepository = postRepository;
            _postService = postService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _postRepository.GetAsync());
        }

        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Create([FromForm] PostCreateDto postCreateDto)
        {
            var currentUserId = User.FindFirst("id").Value;
            return Ok(await _postService.CreateAsync(postCreateDto, currentUserId));
        }
    }
}