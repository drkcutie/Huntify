var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello World!");
app.MapPost('/register', (User user) =>
{
    
    
    
})
app.Run();
public enum UserRole
{
    Client,
    ServiceProvider,
    // Add other roles as needed
}





public record User(
    int Id,
    string FirstName,
    string LastName,
    string Email,
    string Password,
    DateTime Birthdate,
    UserRole Role,
    string ProfilePicture,
    string Description,
    string FacebookLink,
    string InstagramLink,
    DateTime CreatedAt,
    DateTime UpdatedAt
);

 