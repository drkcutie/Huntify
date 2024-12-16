using backend.Models.Skills_and_Reviews;
using backend.Repository.Interfaces;
using backend.Services.Interfaces;

namespace backend.Services.Implementations
{
    public class ServiceOrderService : IServiceOrderService
    {
        private readonly IServiceOrderRepository _serviceOrderRepository;

        public ServiceOrderService(IServiceOrderRepository serviceOrderRepository)
        {
            _serviceOrderRepository = serviceOrderRepository;
        }

        public async Task<ServiceOrder> GetServiceOrderByIdAsync(int id)
        {
            return await _serviceOrderRepository.GetByIdAsync(id);
        }

        public async Task<IEnumerable<ServiceOrder>> GetAllServiceOrdersAsync()
        {
            return await _serviceOrderRepository.GetAllAsync();
        }

        public async Task<ServiceOrder> CreateServiceOrderAsync(ServiceOrder serviceOrder)
        {
            // Add any business logic validation here
            await _serviceOrderRepository.AddAsync(serviceOrder);
            return serviceOrder;
        }

        public async Task UpdateServiceOrderAsync(ServiceOrder serviceOrder)
        {
            // Add any business logic validation here
            await _serviceOrderRepository.UpdateAsync(serviceOrder);
        }

        public async Task DeleteServiceOrderAsync(int id)
        {
            await _serviceOrderRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<ServiceOrder>> GetServiceOrdersByClientAsync(int clientId)
        {
            return await _serviceOrderRepository.FindAsync(so => so.ClientId == clientId);
        }

        public async Task<IEnumerable<ServiceOrder>> GetServiceOrdersByServiceAsync(int serviceId)
        {
            return await _serviceOrderRepository.FindAsync(so => so.ServiceId == serviceId);
        }
    }
}