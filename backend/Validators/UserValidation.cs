using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using backend.Models.User;

namespace backend.Validators;

public class EmailUniqueAttribute : ValidationAttribute
{
    protected override ValidationResult? IsValid(
        object? value, ValidationContext validationContext)
    {
        var context = (UserContext)validationContext.GetService(typeof(UserContext))!;
        var entity = context?.Users.SingleOrDefault(e => value != null && e.Email == value.ToString());

        return entity != null ? new ValidationResult(GetErrorMessage(value?.ToString())) : ValidationResult.Success;
    }
    private string GetErrorMessage(string? email)
    {
        return $"Email {email} is already in use.";
    }
}

public class UserUniqueAttribute : ValidationAttribute
{
    protected override ValidationResult? IsValid(
        object? value, ValidationContext validationContext)
    {
        var context = (UserContext)validationContext.GetService(typeof(UserContext))!;
        var entity = context?.Users.SingleOrDefault(e => value != null && e.Username == value.ToString());

        return entity != null ? new ValidationResult(GetErrorMessage(value?.ToString())) : ValidationResult.Success;
    }
    private string GetErrorMessage(string? username)
    {
        return $"Username {username} is already in use.";
    }
}
