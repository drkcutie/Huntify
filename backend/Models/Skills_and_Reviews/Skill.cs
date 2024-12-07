using System.ComponentModel.DataAnnotations;
using backend.Validators;

namespace backend.Models.Skills_and_Reviews;

public class Skill
{
    [Key]
    public int SkillId { get; set; }
    
    [SkillUnique]
    public string? SkillName { get; set; } = null;

    public string SkillIcon { get; set; } = "Default";

    
    //Relationships
    public ICollection<ServiceProviderSkill> ServiceProviderSkills { get; } = new List<ServiceProviderSkill>();
}