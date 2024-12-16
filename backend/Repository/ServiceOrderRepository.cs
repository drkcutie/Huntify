using backend.Models.Skills_and_Reviews;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using backend.Repository.Interfaces;

namespace backend.Repositories.Implementations
{
    public class ServiceOrderRepository : IServiceOrderRepository
    {
        private readonly DbContext _context;
        private readonly DbSet<ServiceOrder> _dbSet;

        public ServiceOrderRepository(DbContext context)
        {
            _context = context;
            _dbSet = context.Set<ServiceOrder>();
        }

        public async Task<ServiceOrder> GetByIdAsync(int id)
        {
            return await _dbSet
                .Include(so => so.Service)
                .Include(so => so.Client)
                .FirstOrDefaultAsync(so => so.ServiceOrderId == id);
        }

        public async Task<IEnumerable<ServiceOrder>> GetAllAsync()
        {
            return await _dbSet
                .Include(so => so.Service)
                .Include(so => so.Client)
                .ToListAsync();
        }

        public async Task<IEnumerable<ServiceOrder>> FindAsync(Expression<Func<ServiceOrder, bool>> predicate)
        {
            return await _dbSet
                .Include(so => so.Service)
                .Include(so => so.Client)
                .Where(predicate)
                .ToListAsync();
        }

        public async Task AddAsync(ServiceOrder serviceOrder)
        {
            await _dbSet.AddAsync(serviceOrder);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(ServiceOrder serviceOrder)
        {
            _dbSet.Update(serviceOrder);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var serviceOrder = await GetByIdAsync(id);
            if (serviceOrder != null)
            {
                _dbSet.Remove(serviceOrder);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<bool> ExistsAsync(int id)
        {
            return await _dbSet.AnyAsync(so => so.ServiceOrderId == id);
        }
    }
}