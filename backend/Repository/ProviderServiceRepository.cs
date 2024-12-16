using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using backend.Models.Services;
using backend.Models.User;

namespace backend.Repositories
{
    public class ProviderServiceRepository : IProviderServiceRepository
    {
        private readonly SeekrDbContext _context;

        public ProviderServiceRepository(SeekrDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ProviderService>> GetAllAsync()
        {
            return await _context.ProviderServices.ToListAsync();
        }


        public async Task<ProviderService> GetByIdAsync(int id)
        {
            return await _context.ProviderServices.FindAsync(id);
        }

        public async Task<IEnumerable<ProviderService>> GetByServiceProviderIdAsync(int serviceProviderId)
        {
            return await _context.ProviderServices
                .Include(ps => ps.Service)
                .Where(ps => ps.ServiceProviderId == serviceProviderId)
                .ToListAsync();
        }

        public async Task AddAsync(ProviderService providerService)
        {
            _context.ProviderServices.Add(providerService);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(ProviderService providerService)
        {
            _context.Entry(providerService).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var providerService = await _context.ProviderServices.FindAsync(id);
            if (providerService != null)
            {
                _context.ProviderServices.Remove(providerService);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<bool> ExistsAsync(int id)
        {
            return await _context.ProviderServices.AnyAsync(e => e.ProviderServiceId == id);
        }
    }
}