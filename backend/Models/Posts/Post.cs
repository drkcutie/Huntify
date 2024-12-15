using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.InteropServices.JavaScript;
using backend.Models.User;
using Microsoft.EntityFrameworkCore;

namespace backend.Models.Posts;

public class Post
{
    [Key]
    public int PostId { get; set; }
    [ForeignKey("UserModel")]
    public int UserId { get; set; }

    [MinLength(10, ErrorMessage = "Title must be at least 10 characters ")]
    public string Title { get; set; } = null!;

    [MinLength(5, ErrorMessage = "Description must be at least 5 characters ")]
    public string Description { get; set; } = null!;

    //Relationships
    public UserModel User { get; set; } = null!;
    public ICollection<PostLike> PostLikes { get;  } = new List<PostLike>();
    public ICollection<PostImage> PostImages { get; }= new List<PostImage>();
}
public class PostDto(){
public int UserId { get; set; }
public string Title { get; set; } = null!;
public string Description { get; set; } = null!;
}
