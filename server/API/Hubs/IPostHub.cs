using API.Models;
using Microsoft.AspNetCore.SignalR;

namespace API.Hubs
{
    public interface IPostHub
    {
        Task ReceiveNewPost(Post newPost);
    }
}