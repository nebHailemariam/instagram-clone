using API.Data;
using API.Dtos;
using API.Models;
using AutoMapper;

namespace API.Services
{
    public class PostService : IPostService
    {
        private readonly IMapper _mapper;
        private readonly IPostRepository _postRepository;

        public PostService(IMapper mapper, IPostRepository postRepository)
        {
            _mapper = mapper;
            _postRepository = postRepository;
        }

        public async Task<Post> CreateAsync(PostCreateDto postCreateDto, string currentUserId)
        {
            var post = _mapper.Map<Post>(postCreateDto);
            post.ApplicationUserId = currentUserId;
            return await _postRepository.CreateAsync(post, postCreateDto.File);
        }
    }
}