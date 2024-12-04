using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Models.User;

namespace backend.Models.Skills_and_Reviews;

public class ServiceOrder
{
    [Key]
    public int ServiceOrderId { get; set; }

    [ForeignKey("Service")]
    public int ServiceId { get; set; }

    // Navigation property to Service
    public Service.Service Service { get; set; } = null!;

    [ForeignKey("Client")]
    public int ClientId { get; set; }

    // Navigation property to Client
    public Client Client { get; set; } = null!;

    public DateTime ServiceStartDateTime { get; set; }

    public DateTime ServiceEndDateTime { get; set; }

    [Required]
    public int Quantity { get; set; }

    [Required]
    public float Price { get; set; }

    [Required]
    public string ServiceType { get; set; } = "";
}