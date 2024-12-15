using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

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
    [JsonIgnore]
    public Post Post { get; set; } = null!;
}



public class PostImageDto
{
    public int PostId { get; set; }
    public string [] ImagePath { get; set; } = null!;
}