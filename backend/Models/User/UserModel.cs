using System;
using System.ComponentModel.DataAnnotations;
using backend.Models.Posts;
using backend.Validators;

namespace backend.Models.User
{
    public class UserModel
    {
       

        public int Id { get; set; }
        
        [MaxLength(50)] 
        [Required]
        public string? FirstName { get; set; } 

        [MaxLength(50)]
        [Required]
        public string? LastName { get; set; }

        [MaxLength(100)]
        [Required]
        [EmailAddress]
        // Validates email format
        [EmailUnique]
        public string? Email { get; set; }

        [MaxLength(50)]
        [Required]
        [UserUnique]
        public string? Username { get; set; } 

        [MaxLength(50)]
        [Required]
        [DataType(DataType.Password)] // Indicates this is a password
        public string? Password { get; set; } 

        public DateOnly CreatedOn { get; set; } = DateOnly.FromDateTime(DateTime.Now); 
        
        public DateOnly UpdatedOn { get; set; } = DateOnly.FromDateTime(DateTime.Now);

        [MaxLength(255)]
        public string? Biography { get; set; }

        public byte[]? ProfilePicture { get; set; }
        
        
        //Relationships
        public Client? Client { get; set; }
        public ServiceProviderModel? ServiceProvider{ get; set; }
        public ICollection<Post> Posts { get; } = new List<Post>();
        public ICollection<Chat.Chat> Chats { get; } = new List<Chat.Chat>();
        public ICollection<PostLike> PostLikes { get; } = new List<PostLike>();
    }

}