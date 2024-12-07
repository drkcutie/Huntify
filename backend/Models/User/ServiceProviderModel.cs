using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Models.Skills_and_Reviews;
using backend.Models.Service;
using backend.Models.Services;
using Microsoft.AspNetCore.Mvc.ModelBinding.Binders;

namespace backend.Models.User
{
    public class ServiceProviderModel
    {
        // Primary key
        [Key]
        public int ServiceProviderId { get; set; }
        

        // Foreign key reference to UserModel
        [ForeignKey("UserModel")]
        public int UserId { get; set; }

        // Navigation property for UserModel (this is how EF Core knows the relationship)
        public UserModel User { get; set; } = null!;

        // Resume file path
        [MaxLength(255)]
        public string ResumePath { get; set; } = string.Empty;

        // Navigation properties for related entities
        public ICollection<Review>? Reviews { get; set; } = new List<Review>();
        public ICollection<Service.Service>? Services { get; set; } = new List<Service.Service>();
        public ICollection<ServiceProviderSkill>? ServiceProviderSkills { get; set; } = new List<ServiceProviderSkill>();
        
        public ICollection<ProviderService>? ProviderServices { get; set; } = new List<ProviderService>();
    }
}