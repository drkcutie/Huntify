using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Models.User;

namespace backend.Models.Skills_and_Reviews;

public class ServiceProviderSkill
{
    [Key]
    public int ServiceProviderSkillId { get; set; }

    public int ServiceProviderId { get; set; }
    public ServiceProviderModel? ServiceProvider { get; set; } = null!;
    public int SkillId { get; set; }

    // Relationships
    public Skill Skill { get; set; } = null!;
}
