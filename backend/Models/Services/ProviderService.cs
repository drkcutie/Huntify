using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Models.User;

namespace backend.Models.Services;

public class ProviderService
{
 [Key]
 public int ProviderServiceId { get; set; }
 
 public int ServiceProviderId { get; set; }
 
 public ServiceProviderModel? ServiceProvider { get; set; } = null!;
 
 
 public int ServiceId { get; set; }
 
 public Service.Service  Service{ get; set; } = null!;
 
 
 
}