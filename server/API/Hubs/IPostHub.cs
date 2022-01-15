using API.Models;
using Microsoft.AspNetCore.SignalR;

namespace API.Hubs
{
    public interface IPostHub
    {
        Task SendNewPost(Post newPost);
    }
}