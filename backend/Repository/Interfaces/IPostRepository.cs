using backend.Models.Posts;

namespace backend.Repository.Interfaces;

public interface IPostRepository
{
    Task<Post> GetByIdAsync(int id);
    Task<IEnumerable<Post>> GetAllAsync();
    Task<Post> AddAsync(Post post);
    Task UpdateAsync(Post post);
    Task DeleteAsync(int id);
    Task<bool> ExistsAsync(int id);
    Task<IEnumerable<Post>> GetPostsByUserIdAsync(int userId);
}