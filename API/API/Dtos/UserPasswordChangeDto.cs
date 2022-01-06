using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class UserPasswordChangeDto
    {
        [Required(ErrorMessage = "Password is required")]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}