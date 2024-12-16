using backend.Models.Posts;
using backend.Repository.Interfaces;

public class PostService : IPostService
{
    private readonly IPostRepository _postRepository;
    private readonly ILogger<PostService> _logger;

    public PostService(IPostRepository postRepository, ILogger<PostService> logger)
    {
        _postRepository = postRepository;
        _logger = logger;
    }

    public async Task<Post> GetPostByIdAsync(int id)
    {
        var post = await _postRepository.GetByIdAsync(id);
        if (post == null)
        {
            _logger.LogWarning($"Post with id {id} not found");
            throw new KeyNotFoundException($"Post with id {id} not found");
        }
        return post;
    }

    public async Task<IEnumerable<Post>> GetAllPostsAsync()
    {
        return await _postRepository.GetAllAsync();
    }

    public async Task<Post> CreatePostAsync(PostDto postDto)
    {
        // Add validation logic
        if (postDto == null)
        {
            throw new ArgumentNullException(nameof(postDto));
        }

        var post = new Post
        {
            ProviderServiceId = postDto.ProviderServiceId,
            UserId = postDto.UserId,
            Title = postDto.Title,
            Description = postDto.Description
        };

        // If there are post images, you might want to handle them here
        // This is a placeholder for image handling logic
        // You might want to add image upload/processing logic

        return await _postRepository.AddAsync(post);
    }

    public async Task UpdatePostAsync(int id, PostDto postDto)
    {
        var existingPost = await _postRepository.GetByIdAsync(id);
        if (existingPost == null)
        {
            throw new KeyNotFoundException($"Post with id {id} not found");
        }

        // Update properties
        existingPost.Title = postDto.Title;
        existingPost.Description = postDto.Description;
        existingPost.ProviderServiceId = postDto.ProviderServiceId;

        await _postRepository.UpdateAsync(existingPost);
    }

    public async Task DeletePostAsync(int id)
    {
        if (!await _postRepository.ExistsAsync(id))
        {
            throw new KeyNotFoundException($"Post with id {id} not found");
        }

        await _postRepository.DeleteAsync(id);
    }

    public async Task<IEnumerable<Post>> GetPostsByUserAsync(int userId)
    {
        return await _postRepository.GetPostsByUserIdAsync(userId);
    }
}