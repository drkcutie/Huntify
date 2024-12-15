using System;
using System.Collections.Generic;
using System.Drawing;
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
    public class PostImageController : ControllerBase
    {
        private readonly SeekrDbContext _context;

        public PostImageController(SeekrDbContext context)
        {
            _context = context;
        }

        // GET: api/PostImage
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PostImage>>> GetPostImages()
        {
            return await _context.PostImages.ToListAsync();
        }

        // GET: api/PostImage/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PostImage>> GetPostImage(int id)
        {
            var postImage = await _context.PostImages.FindAsync(id);

            if (postImage == null)
            {
                return NotFound();
            }

            return postImage;
        }

        // PUT: api/PostImage/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPostImage(int id, PostImage postImage)
        {
            if (id != postImage.PostImageId)
            {
                return BadRequest();
            }

            _context.Entry(postImage).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PostImageExists(id))
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

        // POST: api/PostImage
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PostImage>> CreatePostImage(PostImage postImage)
        {
            _context.PostImages.Add(postImage);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPostImage", new { id = postImage.PostImageId }, postImage);
        }
        
        
        
        [HttpPost("CreatePostImages")]
        public async Task<IActionResult> UploadFileNames(PostImageDto postImageDto)
        {
            if (postImageDto.ImagePath.Length == 0)
            {
                    return BadRequest(new { Message = "No file uploaded" }); 
            }
            var order = 1;
            foreach (var path in postImageDto.ImagePath)
            {
                var postImage = new PostImage
                {
                    PostId = postImageDto.PostId,
                    ImagePath = path,
                    PostImageOrder = order++ 
                };
                _context.PostImages.Add(postImage);
            }
            await _context.SaveChangesAsync();
            return Ok(new { Message = "File names uploaded successfully", Count = order});
        }
        
        

        // DELETE: api/PostImage/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePostImage(int id)
        {
            var postImage = await _context.PostImages.FindAsync(id);
            if (postImage == null)
            {
                return NotFound();
            }

            _context.PostImages.Remove(postImage);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PostImageExists(int id)
        {
            return _context.PostImages.Any(e => e.PostImageId == id);
        }
    }
}
