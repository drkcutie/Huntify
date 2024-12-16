using backend.Models.Posts;

public interface IPostService
{
    Task<Post> GetPostByIdAsync(int id);
    Task<IEnumerable<Post>> GetAllPostsAsync();
    Task<Post> CreatePostAsync(PostDto postDto);
    Task UpdatePostAsync(int id, PostDto postDto);
    Task DeletePostAsync(int id);
    Task<IEnumerable<Post>> GetPostsByUserAsync(int userId);
}