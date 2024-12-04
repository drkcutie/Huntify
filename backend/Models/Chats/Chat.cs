using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Models.User;

namespace backend.Models.Chat;

public class Chat
{
    [Key]
    public int ChatId { get; set; }

    // Foreign key for UserA
    [ForeignKey(nameof(UserA))]
    public int UserAId { get; set; }

    // Foreign key for UserB
    [ForeignKey(nameof(UserB))]
    public int UserBId { get; set; }

    public DateTime CreatedOn { get; set; } = DateTime.Now;
    public DateTime UpdatedOn { get; set; } = DateTime.Now;

    // Relationships
    [ForeignKey("UserAId")]
    public UserModel UserA { get; set; } = null!;

    [ForeignKey("UserBId")]
    public UserModel UserB { get; set; } = null!;

    public ICollection<ChatMessage> ChatMessages { get; } = new List<ChatMessage>();
}