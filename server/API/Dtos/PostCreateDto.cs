namespace API.Dtos
{
    public class PostCreateDto
    {
        public string Caption { get; set; }
        public IFormFile File { get; set; }
    }
}