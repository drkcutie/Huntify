using System.Configuration;
using backend.Models.Chat;
using backend.Models.Posts;
using backend.Models.Services;
using backend.Models.Skills_and_Reviews;
using Microsoft.EntityFrameworkCore;

namespace backend.Models.User
{
    
    public class SeekrDbContext : DbContext
    {
        public SeekrDbContext(DbContextOptions<SeekrDbContext> options) : base(options)
        {
        }
        
        
        
        
        

        // DbSets representing the database tables for each model
        public DbSet<UserModel> Users { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<ServiceProviderModel> ServiceProviders { get; set; }

        public DbSet<Service.Service> Services { get; set; }
        public DbSet<ServiceOrder> ServiceOrder { get; set; }
        
        public DbSet<ProviderService> ProviderServices { get; set; }

        public DbSet<Review> Reviews { get; set; }
        public DbSet<Skill> Skills { get; set; }
        public DbSet<ServiceProviderSkill> ServiceProviderSkills { get; set; }
        
        public DbSet<Post> Posts { get; set; }
        public DbSet<PostImage> PostImages { get; set; }
        public DbSet<PostLike> PostLikes { get; set; }

        public DbSet<Chat.Chat> Chats { get; set; }
        public DbSet<ChatMessage> ChatMessages { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // One-to-One relationship between UserModel and Client
            modelBuilder.Entity<UserModel>()
                .HasOne(u => u.Client)
                .WithOne(c => c.User)
                .HasForeignKey<Client>(c => c.UserId) // Foreign key in Client table
                .OnDelete(DeleteBehavior.Cascade); // Cascade delete on user deletion

            // One-to-One relationship between UserModel and ServiceProvider
            modelBuilder.Entity<UserModel>()
                .HasOne(u => u.ServiceProvider)
                .WithOne(s => s.User)
                .HasForeignKey<ServiceProviderModel>(s => s.UserId) // Foreign key in ServiceProvider table
                .OnDelete(DeleteBehavior.Cascade); // Cascade delete on user deletion

            // One-to-Many relationship: UserModel and Posts
            modelBuilder.Entity<UserModel>()
                .HasMany(u => u.Posts)
                .WithOne(p => p.User)
                .HasForeignKey(p => p.UserId) // Foreign key in Post table
                .OnDelete(DeleteBehavior.Cascade); // Cascade delete on user deletion

            // One-to-Many relationship: UserModel and PostLikes
            modelBuilder.Entity<UserModel>()
                .HasMany(u => u.PostLikes)
                .WithOne(p => p.User)
                .HasForeignKey(p => p.UserId) // Foreign key in PostLike table
                .OnDelete(DeleteBehavior.Cascade); // Cascade delete on user deletion

            // One-to-Many relationship: Post and PostImages
            modelBuilder.Entity<Post>()
                .HasMany(u => u.PostImages)
                .WithOne(p => p.Post)
                .HasForeignKey(p => p.PostId) // Foreign key in PostImage table
                .OnDelete(DeleteBehavior.Cascade); // Cascade delete on post deletion

            // One-to-Many relationship: Post and PostLikes
            modelBuilder.Entity<Post>()
                .HasMany(u => u.PostLikes)
                .WithOne(p => p.Post)
                .HasForeignKey(p => p.PostId) // Foreign key in PostLike table
                .OnDelete(DeleteBehavior.Cascade); // Cascade delete on post deletion

            // One-to-Many relationship: ServiceProvider and Reviews
            modelBuilder.Entity<ServiceProviderModel>()
                .HasMany(s => s.Reviews)
                .WithOne(r => r.ServiceProviderModel)
                .HasForeignKey(r => r.ServiceProviderId) // Foreign key in Review table
                .OnDelete(DeleteBehavior.Cascade); // Cascade delete on service provider deletion

            // One-to-Many relationship: ServiceProvider and ServiceProviderSkills
            modelBuilder.Entity<ServiceProviderModel>()
                .HasMany(s => s.ServiceProviderSkills)
                .WithOne(ss => ss.ServiceProvider)
                .HasForeignKey(ss => ss.ServiceProviderId) // Foreign key in ServiceProviderSkill table
                .OnDelete(DeleteBehavior.Cascade); // Cascade delete on service provider deletion

            // One-to-Many relationship: ServiceProvider and ProviderServices 
            modelBuilder.Entity<ServiceProviderModel>()
                .HasMany(s => s.ProviderServices)
                .WithOne(ss => ss.ServiceProvider)
                .HasForeignKey(ss =>ss.ServiceProviderId).OnDelete(DeleteBehavior.Restrict);
            
            modelBuilder.Entity<Service.Service>()
                .HasMany(s => s.ProviderServices)
                .WithOne(ss => ss.Service)
                .HasForeignKey(ss =>ss.ServiceId).OnDelete(DeleteBehavior.Restrict);

            // One-to-Many relationship: Skill and ServiceProviderSkills
            modelBuilder.Entity<Skill>()
                .HasMany(s => s.ServiceProviderSkills)
                .WithOne(ss => ss.Skill)
                .HasForeignKey(ss => ss.SkillId) // Foreign key in ServiceProviderSkill table
                .OnDelete(DeleteBehavior.Cascade); // Cascade delete on skill deletion

            // One-to-Many relationship: Client and Reviews
            modelBuilder.Entity<Client>()
                .HasMany(c => c.Reviews)
                .WithOne(r => r.Client)
                .HasForeignKey(r => r.ClientId) // Foreign key in Review table
                .OnDelete(DeleteBehavior.Cascade); // Cascade delete on client deletion

            // One-to-Many relationship: Client and ServiceOrders
            modelBuilder.Entity<Client>()
                .HasMany(c => c.ServiceOrders)
                .WithOne(so => so.Client)
                .HasForeignKey(so => so.ClientId) // Foreign key in ServiceOrder table
                .OnDelete(DeleteBehavior.Cascade); // Cascade delete on client deletion

            // One-to-Many relationship: Service and ServiceOrders
            modelBuilder.Entity<Service.Service>()
                .HasMany(s => s.ServiceOrders)
                .WithOne(so => so.Service)
                .HasForeignKey(so => so.ServiceId) // Foreign key in ServiceOrder table
                .OnDelete(DeleteBehavior.Cascade); // Cascade delete on service deletion

            // Chat relationships between UserA and UserB
            // One-to-Many: Chat and UserA
            modelBuilder.Entity<Chat.Chat>()
                .HasOne(c => c.UserA)
                .WithMany() // No navigation property on UserA for chats
                .HasForeignKey(c => c.UserAId) // Foreign key in Chat table
                .OnDelete(DeleteBehavior.Restrict); // Prevent cascading delete

            // One-to-Many: Chat and UserB
            modelBuilder.Entity<Chat.Chat>()
                .HasOne(c => c.UserB)
                .WithMany() // No navigation property on UserB for chats
                .HasForeignKey(c => c.UserBId) // Foreign key in Chat table
                .OnDelete(DeleteBehavior.Restrict); // Prevent cascading delete

            // One-to-Many relationship: Chat and ChatMessages
            modelBuilder.Entity<Chat.Chat>()
                .HasMany(c => c.ChatMessages)
                .WithOne(cm => cm.Chat)
                .HasForeignKey(cm => cm.ChatId) // Foreign key in ChatMessage table
                .OnDelete(DeleteBehavior.Cascade); // Cascade delete on chat deletion
        }
    }
}
