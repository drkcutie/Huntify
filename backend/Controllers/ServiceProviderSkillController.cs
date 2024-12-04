using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models.Skills_and_Reviews;
using backend.Models.User;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceProviderSkillController : ControllerBase
    {
        private readonly SeekrDbContext _context;

        public ServiceProviderSkillController(SeekrDbContext context)
        {
            _context = context;
        }

        // GET: api/ServiceProviderSkill
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ServiceProviderSkill>>> GetServiceProviderSkills()
        {
            return await _context.ServiceProviderSkills.ToListAsync();
        }

        // GET: api/ServiceProviderSkill/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceProviderSkill>> GetServiceProviderSkill(int id)
        {
            var serviceProviderSkill = await _context.ServiceProviderSkills.FindAsync(id);

            if (serviceProviderSkill == null)
            {
                return NotFound();
            }

            return serviceProviderSkill;
        }

        // PUT: api/ServiceProviderSkill/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutServiceProviderSkill(int id, ServiceProviderSkill serviceProviderSkill)
        {
            if (id != serviceProviderSkill.ServiceProviderSkillId)
            {
                return BadRequest();
            }

            _context.Entry(serviceProviderSkill).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ServiceProviderSkillExists(id))
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

        // POST: api/ServiceProviderSkill
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ServiceProviderSkill>> PostServiceProviderSkill(ServiceProviderSkill serviceProviderSkill)
        {
            _context.ServiceProviderSkills.Add(serviceProviderSkill);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetServiceProviderSkill", new { id = serviceProviderSkill.ServiceProviderSkillId }, serviceProviderSkill);
        }

        // DELETE: api/ServiceProviderSkill/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteServiceProviderSkill(int id)
        {
            var serviceProviderSkill = await _context.ServiceProviderSkills.FindAsync(id);
            if (serviceProviderSkill == null)
            {
                return NotFound();
            }

            _context.ServiceProviderSkills.Remove(serviceProviderSkill);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ServiceProviderSkillExists(int id)
        {
            return _context.ServiceProviderSkills.Any(e => e.ServiceProviderSkillId == id);
        }
    }
}
