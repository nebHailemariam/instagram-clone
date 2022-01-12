using API.Models;
using Microsoft.AspNetCore.SignalR;

namespace API.Hubs
{
    public class PostHub : Hub<IPostHub>
    {
        public async Task BroadCastPost(Post newPost)
        {
            await Clients.All.ReceiveNewPost(newPost);
        }
    }
}