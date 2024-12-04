using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.InteropServices.JavaScript;
using backend.Models.User;

namespace backend.Models.Chat;

public class ChatMessage
{
    
    [Key]
    public int ChatMessageId { get; set; }

    [ForeignKey("Chat")]
    public int ChatId { get; set; }

    [ForeignKey("User")]
    public int SentBy { get; set; }

    [Required]
    [MaxLength(255)]  // Optional: limit the maximum length of the message
    public string Content { get; set; } = string.Empty;  // Ensures it's not null and initialized to an empty string

    public DateTime DateCreated { get; set; } = DateTime.Now;

    public DateTime? DateRead { get; set; } = null; // Track when the message was read (nullable)

    public bool ReadStatus { get; set; } = false;

    // Relationships
    public Chat Chat { get; set; } = null!;

}