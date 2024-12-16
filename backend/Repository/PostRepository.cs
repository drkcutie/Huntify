using backend.Models.Posts;
using backend.Models.User;
using backend.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

public class PostRepository : IPostRepository
{
    private readonly SeekrDbContext _context;
    private readonly DbSet<Post> _dbSet;

    public PostRepository(SeekrDbContext context)
    {
        _context = context;
        _dbSet = context.Set<Post>();
    }

    public async Task<Post> GetByIdAsync(int id)
    {
        return await _dbSet
            .Include(p => p.PostImages)
            .FirstOrDefaultAsync(p => p.PostId == id);
    }

    public async Task<IEnumerable<Post>> GetAllAsync()
    {
        return await _dbSet
            .Include(p => p.PostImages)
            .ToListAsync();
    }

    public async Task<Post> AddAsync(Post post)
    {
        await _dbSet.AddAsync(post);
        await _context.SaveChangesAsync();
        return post;
    }

    public async Task UpdateAsync(Post post)
    {
        _context.Entry(post).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var post = await GetByIdAsync(id);
        if (post != null)
        {
            _dbSet.Remove(post);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<bool> ExistsAsync(int id)
    {
        return await _dbSet.AnyAsync(p => p.PostId == id);
    }

    public async Task<IEnumerable<Post>> GetPostsByUserIdAsync(int userId)
    {
        return await _dbSet
            .Include(p => p.PostImages)
            .Where(p => p.UserId == userId)
            .ToListAsync();
    }
}