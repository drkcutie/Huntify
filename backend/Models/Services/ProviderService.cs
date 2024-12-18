using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Models.Posts;
using backend.Models.User;
using Newtonsoft.Json;

namespace backend.Models.Services;

public class ProviderService
{
     public int ProviderServiceId { get; set; }

    public int ServiceProviderId { get; set; }

    [JsonIgnore]
    public ServiceProviderModel? ServiceProvider { get; set; } = null!;


    public int ServiceId { get; set; }
    [JsonIgnore]
    public Service.Service Service { get; set; } = null!;


    public double Rate { get; set; }

    public RateType RateType { get; set; }
    [MaxLength(255)] 
    public string Description { get; set; } = null!;

    public Experience YearsOfExperience { get; set; }

  
}

public class PostProviderServiceDto
{

    [Required]
    public int ServiceProviderId { get; set; }
    [Required]
    public int ServiceId { get; set; }
    [Required]
    public double Rate { get; set; }
    [Required]
    public RateType RateType { get; set; }
    [Required]
    public string Description { get; set; }
    [Required]
    public Experience YearsOfExperience { get; set; }
}

public enum Experience
{
    LessThanOneYear,
    OneToThreeYears,
    ThreeToFiveYears,
    MoreThanFiveYears
}

public enum RateType
{
    PerHour,
    PerOrder
}
