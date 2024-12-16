using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using backend.Models.Services;
using backend.Models.User;
using backend.Repositories;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProviderServiceController : ControllerBase
    {
        private readonly IProviderServiceRepository _repository;

        public ProviderServiceController(IProviderServiceRepository repository)
        {
            _repository = repository;
        }

        // GET: api/ProviderService
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProviderService>>> GetProviderServices()
        {
            try 
            {
                var services = await _repository.GetAllAsync();
                return Ok(services);
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(500, "An error occurred while retrieving provider services.");
            }
        }

        [HttpGet("getProviderServiceID")]
        public async Task<ActionResult<List<ProviderService>>> GetProviderServicesByServiceProviderId([FromQuery] int serviceProviderId)
        {
            try 
            {
                var providerServices = await _repository.GetByServiceProviderIdAsync(serviceProviderId);
                
                if (providerServices == null || !providerServices.Any())
                {
                    return NotFound($"No provider services found for service provider ID {serviceProviderId}");
                }

                return Ok(providerServices);
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(500, $"An error occurred while retrieving provider services for service provider ID {serviceProviderId}.");
            }
        }

        // GET: api/ProviderService/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProviderService>> GetProviderService(int id)
        {
            try 
            {
                var providerService = await _repository.GetByIdAsync(id);
                
                if (providerService == null)
                {
                    return NotFound($"Provider service with ID {id} not found");
                }

                return Ok(providerService);
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(500, $"An error occurred while retrieving provider service with ID {id}.");
            }
        }

        // PUT: api/ProviderService/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProviderService(int id, ProviderService providerService)
        {
            if (id != providerService.ProviderServiceId)
            {
                return BadRequest("Mismatched provider service ID");
            }

            try 
            {
                var exists = await _repository.ExistsAsync(id);
                if (!exists)
                {
                    return NotFound($"Provider service with ID {id} not found");
                }

                await _repository.UpdateAsync(providerService);
                return NoContent();
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(500, $"An error occurred while updating provider service with ID {id}.");
            }
        }

        // POST: api/ProviderService
        [HttpPost]
        public async Task<ActionResult<ProviderService>> PostProviderService(ProviderService providerService)
        {
            try 
            {
                await _repository.AddAsync(providerService);
                return CreatedAtAction(nameof(GetProviderService), new { id = providerService.ProviderServiceId }, providerService);
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(500, "An error occurred while creating the provider service.");
            }
        }
        
        [HttpPost("PostProviderServiceDto")]
        public async Task<ActionResult<ProviderService>> PostProviderServiceDto(PostProviderServiceDto postProviderServiceDto)
        {
            try 
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
                
                await _repository.AddAsync(providerService);
                return CreatedAtAction(nameof(GetProviderService), new { id = providerService.ProviderServiceId }, providerService);
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(500, "An error occurred while creating the provider service.");
            }
        }

        // DELETE: api/ProviderService/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProviderService(int id)
        {
            try 
            {
                var exists = await _repository.ExistsAsync(id);
                if (!exists)
                {
                    return NotFound($"Provider service with ID {id} not found");
                }

                await _repository.DeleteAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(500, $"An error occurred while deleting provider service with ID {id}.");
            }
        }
    }
}