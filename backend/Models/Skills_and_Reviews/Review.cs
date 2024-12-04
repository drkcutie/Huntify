using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Models.User;

namespace backend.Models.Skills_and_Reviews;

public class Review
{
    [Key]
    public int ReviewId { get; set; }

    [ForeignKey("ServiceProvider")]
    public int ServiceProviderId { get; set; }

    [ForeignKey("Client")]
    public int ClientId { get; set; }

    [Range(1, 10, ErrorMessage = "Rating must be between 1 and 10.")]
    public int Rating { get; set; } = 0;

    [MinLength(10, ErrorMessage = "Content must be at least 10 characters.")]
    [Required]
    public string Content { get; set; } = "";

    public DateTime CreatedOn { get; set; } = DateTime.Now;
    public DateTime UpdatedOn { get; set; } = DateTime.Now;

    // Relationships
    public Client Client { get; set; } = null!;
    public ServiceProviderModel ServiceProviderModel { get; set; } = null!;
}