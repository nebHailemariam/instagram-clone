using API.Data;
using API.Dtos;
using API.Hubs;
using API.Models;
using AutoMapper;
using Microsoft.AspNetCore.SignalR;

namespace API.Services
{
    public class PostService : IPostService
    {
        private readonly IMapper _mapper;
        private readonly IHubContext<PostHub, IPostHub> _postHub;
        private readonly IPostRepository _postRepository;

        private readonly IUserRepository _userRepository;
        public PostService(IMapper mapper, IHubContext<PostHub, IPostHub> postHub, IPostRepository postRepository, IUserRepository userRepository)
        {
            _mapper = mapper;
            _postHub = postHub;
            _postRepository = postRepository;
            _userRepository = userRepository;
        }

        public async Task<Post> CreateAsync(PostCreateDto postCreateDto, string currentUserId)
        {
            var post = _mapper.Map<Post>(postCreateDto);
            post.ApplicationUserId = currentUserId;
            post = await _postRepository.CreateAsync(post, postCreateDto.File);
            post.ApplicationUser = await _userRepository.GetByIdAsync(currentUserId);
            await _postHub.Clients.All.SendNewPost(post);
            return post;
        }
    }
}