using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using backend.Models.Skills_and_Reviews;
using backend.Models.User;

namespace backend.Models.Service;

public class Service
{
    [Key]
    public int ServiceId { get; set; }
    
    [ForeignKey("ServiceProvider")]
    public int ServiceProviderId { get; set; }

    // Navigation property to ServiceProvider
    public ServiceProviderModel? ServiceProvider { get; set; } 

    [Required] 
    public string ServiceType { get; set; } = "General";

    public string Title { get; set; } = "";

    public string Description { get; set; } = "";

    // Relationships
    public ICollection<ServiceOrder> ServiceOrders { get; } = new List<ServiceOrder>();
}