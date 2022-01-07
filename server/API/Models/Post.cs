using API.Domain.Enums;

namespace API.Models
{
    public class Post
    {
        public string Id { get; set; }
        public string ApplicationUserId { get; set; }
        public ApplicationUser ApplicationUser { get; set; }
        public FileType FileType { get; set; }
        public string FileUrl { get; set; }
        public string Caption { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}