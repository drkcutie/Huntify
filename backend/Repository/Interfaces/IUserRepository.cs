using backend.Models.User;

public interface IUserRepository
{
    Task<UserModel?> GetByIdAsync(int id);
    Task<UserModel?> GetByUsernameAsync(string username);
    Task<UserModel?> GetByEmailAsync(string email);
    Task<IEnumerable<UserModel>> GetAllAsync();
    Task<UserModel> AddAsync(UserModel user);
    Task UpdateAsync(UserModel user);
    Task DeleteAsync(int id);
    Task<bool> ExistsAsync(int id);
    Task<bool> IsUsernameTakenAsync(string username);
    Task<bool> IsEmailTakenAsync(string email);
}