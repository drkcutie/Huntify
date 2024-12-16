using backend.Models.User;
using Microsoft.EntityFrameworkCore;

public class UserRepository : IUserRepository
{
    private readonly  DbContext _context;
    private readonly DbSet<UserModel> _dbSet;

    public UserRepository(DbContext context)
    {
        _context = context;
        _dbSet = context.Set<UserModel>();
    }

    public async Task<UserModel?> GetByIdAsync(int id)
    {
        return await _dbSet
            .Include(u => u.Client)
            .Include(u => u.ServiceProvider)
            .Include(u => u.Posts)
            .Include(u => u.Chats)
            .FirstOrDefaultAsync(u => u.Id == id);
    }

    public async Task<UserModel?> GetByUsernameAsync(string username)
    {
        return await _dbSet
            .Include(u => u.Client)
            .Include(u => u.ServiceProvider)
            .FirstOrDefaultAsync(u => u.Username == username);
    }

    public async Task<UserModel?> GetByEmailAsync(string email)
    {
        return await _dbSet
            .Include(u => u.Client)
            .Include(u => u.ServiceProvider)
            .FirstOrDefaultAsync(u => u.Email == email);
    }

    public async Task<IEnumerable<UserModel>> GetAllAsync()
    {
        return await _dbSet
            .Include(u => u.Client)
            .Include(u => u.ServiceProvider)
            .ToListAsync();
    }

    public async Task<UserModel> AddAsync(UserModel user)
    {
        await _dbSet.AddAsync(user);
        await _context.SaveChangesAsync();
        return user;
    }

    public async Task UpdateAsync(UserModel user)
    {
        _context.Entry(user).State = EntityState.Modified;
        user.UpdatedOn = DateOnly.FromDateTime(DateTime.UtcNow);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var user = await GetByIdAsync(id);
        if (user != null)
        {
            _dbSet.Remove(user);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<bool> ExistsAsync(int id)
    {
        return await _dbSet.AnyAsync(u => u.Id == id);
    }

    public async Task<bool> IsUsernameTakenAsync(string username)
    {
        return await _dbSet.AnyAsync(u => u.Username == username);
    }

    public async Task<bool> IsEmailTakenAsync(string email)
    {
        return await _dbSet.AnyAsync(u => u.Email == email);
    }
}