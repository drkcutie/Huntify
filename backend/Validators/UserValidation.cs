using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using backend.Models.User;
using NuGet.Protocol;

namespace backend.Validators;

public class EmailUniqueAttribute : ValidationAttribute
{
    protected override ValidationResult? IsValid(
        object? value, ValidationContext validationContext)
    {
        var context = (SeekrDbContext)validationContext.GetService(typeof(SeekrDbContext))!;
        var entity = context?.Users.SingleOrDefault(e => value != null && e.Email == value.ToString());

        return entity != null ? new ValidationResult(GetErrorMessage(value?.ToString())) : ValidationResult.Success;
    }
    private string GetErrorMessage(string? email)
    {
        return $"Email {email} is already in use.";
    }
}

public class UserUniqueAttribute : ValidationAttribute {
    protected override ValidationResult? IsValid(
        object? value, ValidationContext validationContext)
    {
        var context = (SeekrDbContext)validationContext.GetService(typeof(SeekrDbContext))!;
        var entity = context?.Users.SingleOrDefault(e => value != null && e.Username == value.ToString());

        return entity != null ? new ValidationResult(GetErrorMessage(value?.ToString())) : ValidationResult.Success;
    }
    private string GetErrorMessage(string? username)
    {
        return $"Username {username} is already in use.";
    }
}
public class  SkillUniqueAttribute : ValidationAttribute {
    protected override ValidationResult? IsValid(
        object? value, ValidationContext validationContext)
    {
        var context = (SeekrDbContext)validationContext.GetService(typeof(SeekrDbContext))!;
        var entity = context?.Skills.SingleOrDefault(e => value != null && e.SkillName== value.ToString());

        return entity != null ? new ValidationResult(GetErrorMessage(value?.ToString())) : ValidationResult.Success;
    }
    private string GetErrorMessage(string? skill)
    {
        return $"Skill {skill} is already in use.";
    }
}

public class  ServiceUniqueAttribute : ValidationAttribute {
    protected override ValidationResult? IsValid(
        object? value, ValidationContext validationContext)
    {
        var context = (SeekrDbContext)validationContext.GetService(typeof(SeekrDbContext))!;
        var entity = context?.Services.SingleOrDefault(e => value != null && e.Title == value.ToString());
        return entity != null ? new ValidationResult(GetErrorMessage(value?.ToString())) : ValidationResult.Success;
    }
    private string GetErrorMessage(string? service)
    {
        return $"Service {service} is already in use.";
    }
}



