using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models.Services;
using backend.Models.User;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProviderServiceController : ControllerBase
    {
        private readonly SeekrDbContext _context;

        public ProviderServiceController(SeekrDbContext context)
        {
            _context = context;
        }

        // GET: api/ProviderService
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProviderService>>> GetProviderServices()
        {
            return await _context.ProviderServices.ToListAsync();
        }

        // GET: api/ProviderService/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProviderService>> GetProviderService(int id)
        {
            var providerService = await _context.ProviderServices.FindAsync(id);

            if (providerService == null)
            {
                return NotFound();
            }

            return providerService;
        }

        // PUT: api/ProviderService/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProviderService(int id, ProviderService providerService)
        {
            if (id != providerService.ProviderServiceId)
            {
                return BadRequest();
            }

            _context.Entry(providerService).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProviderServiceExists(id))
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

        // POST: api/ProviderService
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ProviderService>> PostProviderService(ProviderService providerService)
        {
            _context.ProviderServices.Add(providerService);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProviderService", new { id = providerService.ProviderServiceId }, providerService);
        }
        
        [HttpPost("PostProviderServiceDto")]
        public async Task<ActionResult<ProviderService>> PostProviderServiceDto(PostProviderServiceDto postProviderServiceDto)
        {
            var providerService = new ProviderService
            {
                ServiceProviderId = postProviderServiceDto.ServiceProviderId,
                ServiceId = postProviderServiceDto.ServiceId,
                Rate = postProviderServiceDto.Rate,
                RateType = postProviderServiceDto.RateType,
                Description = postProviderServiceDto.Description,
                YearsOfExperience = postProviderServiceDto.YearsOfExperience
            };
            
            _context.ProviderServices.Add(providerService);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProviderService", new { id = providerService.ProviderServiceId }, providerService);
        }

        // DELETE: api/ProviderService/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProviderService(int id)
        {
            var providerService = await _context.ProviderServices.FindAsync(id);
            if (providerService == null)
            {
                return NotFound();
            }

            _context.ProviderServices.Remove(providerService);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProviderServiceExists(int id)
        {
            return _context.ProviderServices.Any(e => e.ProviderServiceId == id);
        }
    }
}
