using backend.Models.Skills_and_Reviews;

namespace backend.Services.Interfaces
{
    public interface IServiceOrderService
    {
        Task<ServiceOrder> GetServiceOrderByIdAsync(int id);
        Task<IEnumerable<ServiceOrder>> GetAllServiceOrdersAsync();
        Task<ServiceOrder> CreateServiceOrderAsync(ServiceOrder serviceOrder);
        Task UpdateServiceOrderAsync(ServiceOrder serviceOrder);
        Task DeleteServiceOrderAsync(int id);
        Task<IEnumerable<ServiceOrder>> GetServiceOrdersByClientAsync(int clientId);
        Task<IEnumerable<ServiceOrder>> GetServiceOrdersByServiceAsync(int serviceId);
    }
}