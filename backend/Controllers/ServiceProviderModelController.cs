using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models.User;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceProviderModelController : ControllerBase
    {
        private readonly SeekrDbContext _context;

        public ServiceProviderModelController(SeekrDbContext context)
        {
            _context = context;
        }

        // GET: api/ServiceProviderModel
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ServiceProviderModel>>> GetServiceProviders()
        {
            return await _context.ServiceProviders.ToListAsync();
        }

        // GET: api/ServiceProviderModel/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceProviderModel>> GetServiceProviderModel(int id)
        {
            var serviceProviderModel = await _context.ServiceProviders.FindAsync(id);

            if (serviceProviderModel == null)
            {
                return NotFound();
            }

            return serviceProviderModel;
        }

        // PUT: api/ServiceProviderModel/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutServiceProviderModel(int id, ServiceProviderModel serviceProviderModel)
        {
            if (id != serviceProviderModel.ServiceProviderId)
            {
                return BadRequest();
            }

            _context.Entry(serviceProviderModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ServiceProviderModelExists(id))
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

        // POST: api/ServiceProviderModel
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ServiceProviderModel>> PostServiceProviderModel(ServiceProviderModel serviceProviderModel)
        {
            _context.ServiceProviders.Add(serviceProviderModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetServiceProviderModel", new { id = serviceProviderModel.ServiceProviderId }, serviceProviderModel);
        }

        // DELETE: api/ServiceProviderModel/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteServiceProviderModel(int id)
        {
            var serviceProviderModel = await _context.ServiceProviders.FindAsync(id);
            if (serviceProviderModel == null)
            {
                return NotFound();
            }

            _context.ServiceProviders.Remove(serviceProviderModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ServiceProviderModelExists(int id)
        {
            return _context.ServiceProviders.Any(e => e.ServiceProviderId == id);
        }
    }
}
