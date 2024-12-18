using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models.Posts;
using backend.Models.User;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly SeekrDbContext _context;

        public PostController(SeekrDbContext context)
        {
            _context = context;
        }

        // GET: api/Post | Get all posts including their corresponding images
        [HttpGet("GetAllPosts")]
        public async Task<ActionResult<IEnumerable<Post>>> GetAllPosts()
        {
            var posts = await _context.Posts.Include(posts => posts.PostImages).ToListAsync();
            
            return posts;
        }
        // GET: api/Post/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Post>> GetPost(int id)
        {
            var post = await _context.Posts.FindAsync(id);

            if (post == null)
            {
                return NotFound();
            }

            return post;
        }

        // PUT: api/Post/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPost(int id, Post post)
        {
            if (id != post.PostId)
            {
                return BadRequest();
            }

            _context.Entry(post).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PostExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Post
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Post>> CreatePost(Post post)
        {
            _context.Posts.Add(post);
            
            await _context.SaveChangesAsync();
            
            return CreatedAtAction("GetPost", new { id = post.PostId }, post);
        }
        
        [HttpPost("CreatePostUsingDto")]
        public async Task<ActionResult<Post>>  CreatePostUsingDto (PostDto postDto)
        {
            var post = new Post()
            {
                ProviderServiceId = postDto.ProviderServiceId,
                UserId = postDto.UserId,
                Title = postDto.Title,
                Description = postDto.Description
            };
            _context.Posts.Add(post);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetPost", new { id = post.PostId }, post);
            
        }

        // DELETE: api/Post/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePost(int id)
        {
            var post = await _context.Posts.FindAsync(id);
            if (post == null)
            {
                return NotFound();
            }

            _context.Posts.Remove(post);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PostExists(int id)
        {
            return _context.Posts.Any(e => e.PostId == id);
        }
    }
}
