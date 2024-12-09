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


 public double Rate { get; set; }
 
 public RateType RateType;
 [MaxLength(255)]
 public string Description { get; set; } = null!;
 
 public  Experience YearsOfExperience { get; set; }

}

public enum Experience
{
 LessThanOneYear, OneToThreeYears, ThreeToFiveYears, MoreThanFiveYears
}


public enum RateType
{
 PerHour, PerOrder
}