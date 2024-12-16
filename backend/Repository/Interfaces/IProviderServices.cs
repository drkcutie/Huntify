using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Models.Services;

namespace backend.Repositories
{
    public interface IProviderServiceRepository
    {
        Task<IEnumerable<ProviderService>> GetAllAsync();
        
        Task<ProviderService> GetByIdAsync(int id);
        Task<IEnumerable<ProviderService>> GetByServiceProviderIdAsync(int serviceProviderId);
        Task AddAsync(ProviderService providerService);
        Task UpdateAsync(ProviderService providerService);
        Task DeleteAsync(int id);
        Task<bool> ExistsAsync(int id);
    }
}