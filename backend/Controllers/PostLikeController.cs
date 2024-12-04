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
    public class PostLikeController : ControllerBase
    {
        private readonly SeekrDbContext _context;

        public PostLikeController(SeekrDbContext context)
        {
            _context = context;
        }

        // GET: api/PostLike
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PostLike>>> GetPostLikes()
        {
            return await _context.PostLikes.ToListAsync();
        }

        // GET: api/PostLike/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PostLike>> GetPostLike(int id)
        {
            var postLike = await _context.PostLikes.FindAsync(id);

            if (postLike == null)
            {
                return NotFound();
            }

            return postLike;
        }

        // PUT: api/PostLike/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPostLike(int id, PostLike postLike)
        {
            if (id != postLike.PostLikeId)
            {
                return BadRequest();
            }

            _context.Entry(postLike).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PostLikeExists(id))
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

        // POST: api/PostLike
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PostLike>> PostPostLike(PostLike postLike)
        {
            _context.PostLikes.Add(postLike);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPostLike", new { id = postLike.PostLikeId }, postLike);
        }

        // DELETE: api/PostLike/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePostLike(int id)
        {
            var postLike = await _context.PostLikes.FindAsync(id);
            if (postLike == null)
            {
                return NotFound();
            }

            _context.PostLikes.Remove(postLike);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PostLikeExists(int id)
        {
            return _context.PostLikes.Any(e => e.PostLikeId == id);
        }
    }
}
