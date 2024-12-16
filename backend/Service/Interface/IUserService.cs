using backend.Models.User;

public interface IUserService
{
    Task<UserModel> RegisterUserAsync(RegisterDTO registerDto);
    Task<UserModel> AuthenticateUserAsync( LoginDTO loginDto);
    Task<UserModel> UpdateUserProfileAsync(int userId, UserModel updatedUser);
    Task<bool> ChangePasswordAsync(int userId, string currentPassword, string newPassword);
    Task<UserModel> GetUserProfileAsync(int userId);
    Task<bool> DeleteUserAccountAsync(int userId);
    Task<IEnumerable<UserModel>> GetAllUsersAsync();
}