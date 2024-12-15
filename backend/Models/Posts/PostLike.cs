using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Models.User;

namespace backend.Models.Posts;

public class PostLike
{

    [Key]
    public int PostLikeId { get; set; }
    
    [ForeignKey("Post")]
    public int PostId { get; set; }
    
    
    [ForeignKey("UserModel")]
    public int UserId { get; set; }

    public bool Like { get; set; } = false;
    
    
    //Relationship
    public Post Post { get; set; } = null!;
    public UserModel User { get; set; } = null!;
    
}

public class PostLikeDto
{
    public int PostId { get; set; }
    public int UserId { get; set; }
    public bool Like { get; set; }
    
}