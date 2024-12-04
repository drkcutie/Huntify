using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Models.Skills_and_Reviews;

namespace backend.Models.User;

public class Client
{
    [Key]
    public int ClientId { get; set; }

    [ForeignKey("UserModel")]
    public int UserId { get; set; }

    public UserModel User { get; set; } = null!;
    
    
    //Relationships
    public ICollection<ServiceOrder> ServiceOrders { get; } = new List<ServiceOrder>();
    public ICollection<Review> Reviews{ get; } = new List<Review>();




}