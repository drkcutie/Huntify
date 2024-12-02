using Microsoft.EntityFrameworkCore;

namespace backend.Models.User
{
    public class UserContext : DbContext
    {
        public UserContext (DbContextOptions<UserContext> options) : base(options)
        {
        }
        public DbSet<UserModel> Users { get; set; }  // Assuming you have a User model
        // Add other DbSet properties for other models here
        
    }
}
