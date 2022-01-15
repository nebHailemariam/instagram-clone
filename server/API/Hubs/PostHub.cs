using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace API.Hubs
{
    public class PostHub : Hub<IPostHub>
    {
        public async Task BroadCastPost(Post newPost)
        {
            await Clients.All.SendNewPost(newPost);
        }

        [Authorize]
        public string GetConnectionId()
        {
            return Context.ConnectionId;
        }

        public void SendConnectionId(string connectionId)
        {
            string currentUserId = Context.User.FindFirst("id").Value;
            Console.WriteLine($"User Id: {currentUserId}\nConnection Id: {connectionId}");
        }
        public async override Task OnConnectedAsync()
        {
            string currentUserId = Context.User.FindFirst("id").Value;
            string connectionId = Context.ConnectionId;
            Console.WriteLine($"User Id: {currentUserId}\nConnection Id: {connectionId}");
            await base.OnConnectedAsync();
        }

#nullable enable
        public async override Task OnDisconnectedAsync(Exception? exception)
        {
            await base.OnDisconnectedAsync(exception);
        }
    }
}