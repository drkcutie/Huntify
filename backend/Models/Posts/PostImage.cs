using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models.Posts;

public class PostImage
{
    [Key]
    public int PostImageId { get; set; }
    [ForeignKey("Post")]
    public int  PostId { get; set; }
    
    
    public int PostImageOrder { get; set; }
    public string ImagePath { get; set; } = null!;
    
    
    //Relationship
    public Post Post { get; set; } = null!;
}



public class PostImageDto
{
    public int PostId { get; set; }
    public string [] ImagePath { get; set; } = null!;
}