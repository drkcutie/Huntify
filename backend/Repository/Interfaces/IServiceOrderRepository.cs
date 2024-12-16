using System.Linq.Expressions;
using backend.Models.Skills_and_Reviews;

namespace backend.Repository.Interfaces
{
    public interface IServiceOrderRepository
    {
        Task<ServiceOrder> GetByIdAsync(int id);
        Task<IEnumerable<ServiceOrder>> GetAllAsync();
        Task<IEnumerable<ServiceOrder>> FindAsync(Expression<Func<ServiceOrder, bool>> predicate);
        Task AddAsync(ServiceOrder serviceOrder);
        Task UpdateAsync(ServiceOrder serviceOrder);
        Task DeleteAsync(int id);
        Task<bool> ExistsAsync(int id);
    }
}