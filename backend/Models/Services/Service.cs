using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using backend.Models.Services;
using backend.Models.Skills_and_Reviews;
using backend.Models.User;
using backend.Validators;

namespace backend.Models.Service;

public class Service
{
    [Key]
    public int ServiceId { get; set; }
    
    [ServiceUnique] 
    public string ServiceType { get; set; } = "General";

    public string Title { get; set; } = "";

    public string Description { get; set; } = "";

    // Relationships
    public ICollection<ServiceOrder> ServiceOrders { get; } = new List<ServiceOrder>();
    public ICollection<ProviderService> ProviderServices { get; } = new List<ProviderService>();
}