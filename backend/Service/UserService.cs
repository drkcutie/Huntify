using System.Security.Authentication;
using backend.Models.User;
using Microsoft.AspNetCore.Identity;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;
    private readonly IPasswordHasher<UserModel> _passwordHasher;
    private readonly ILogger<UserService> _logger;

    public UserService(
        IUserRepository userRepository, 
        IPasswordHasher<UserModel> passwordHasher,
        ILogger<UserService> logger)
    {
        _userRepository = userRepository;
        _passwordHasher = passwordHasher;
        _logger = logger;
    }

    public async Task<UserModel> RegisterUserAsync(RegisterDTO registerDto)
    {
        // Validate unique username and email
        if (await _userRepository.IsUsernameTakenAsync(registerDto.Username))
        {
            throw new Exception("Username is already taken");
        }

        if (await _userRepository.IsEmailTakenAsync(registerDto.Email))
        {
            throw new Exception("Email is already registered");
        }

        // Create user model
        var user = new UserModel
        {
            FirstName = registerDto.FirstName,
            LastName = registerDto.LastName,
            Username = registerDto.Username,
            Email = registerDto.Email,
            DateOfBirth = registerDto.DateOfBirth,
            CreatedOn = DateOnly.FromDateTime(DateTime.UtcNow),
            UpdatedOn = DateOnly.FromDateTime(DateTime.UtcNow)
        };

        // Hash password
        user.Password = _passwordHasher.HashPassword(user, registerDto.Password);

        // Create corresponding account type
        switch (registerDto.AccountType)
        {
            case AccountType.Client:
                user.Client = new Client { UserId = user.Id };
                break;
            case AccountType.ServiceProvider:
                user.ServiceProvider = new ServiceProviderModel { UserId = user.Id };
                break;
            default:
                throw new ArgumentException("Invalid account type");
        }

        // Save user
        return await _userRepository.AddAsync(user);
    }

    public async Task<UserModel> AuthenticateUserAsync(LoginDTO loginDto)
    {
        var user = await _userRepository.GetByUsernameAsync(loginDto.Username);
        if (user == null)
        {
            throw new AuthenticationException("Invalid username or password");
        }

        // Verify password
        var passwordVerificationResult = _passwordHasher.VerifyHashedPassword(
            user, 
            user.Password, 
            loginDto.Password
        );

        if (passwordVerificationResult == PasswordVerificationResult.Failed)
        {
            throw new AuthenticationException("Invalid username or password");
        }

        return user;
    }

    public async Task<UserModel> UpdateUserProfileAsync(int userId, UserModel updatedUser)
    {
        var existingUser = await _userRepository.GetByIdAsync(userId);
        if (existingUser == null)
        {
            throw new KeyNotFoundException($"User with id {userId} not found");
        }

        // Update specific fields
        existingUser.FirstName = updatedUser.FirstName;
        existingUser.LastName = updatedUser.LastName;
        existingUser.Biography = updatedUser.Biography;
        existingUser.ProfilePicture = updatedUser.ProfilePicture;
        existingUser.CoverPhoto = updatedUser.CoverPhoto;

        await _userRepository.UpdateAsync(existingUser);
        return existingUser;
    }

    public async Task<bool> ChangePasswordAsync(int userId, string currentPassword, string newPassword)
    {
        var user = await _userRepository.GetByIdAsync(userId);
        if (user == null)
        {
            throw new KeyNotFoundException($"User with id {userId} not found");
        }

        // Verify current password
        var passwordVerificationResult = _passwordHasher.VerifyHashedPassword(
            user, 
            user.Password, 
            currentPassword
        );

        if (passwordVerificationResult == PasswordVerificationResult.Failed)
        {
            throw new AuthenticationException("Current password is incorrect");
        }

        // Hash and update new password
        user.Password = _passwordHasher.HashPassword(user, newPassword);
        await _userRepository.UpdateAsync(user);
        return true;
    }

    public async Task<UserModel> GetUserProfileAsync(int userId)
    {
        var user = await _userRepository.GetByIdAsync(userId);
        if (user == null)
        {
            throw new KeyNotFoundException($"User with id {userId} not found");
        }
        return user;
    }

    public async Task<bool> DeleteUserAccountAsync(int userId)
    {
        if (!await _userRepository.ExistsAsync(userId))
        {
            throw new KeyNotFoundException($"User with id {userId} not found");
        }

        await _userRepository.DeleteAsync(userId);
        return true;
    }

    public async Task<IEnumerable<UserModel>> GetAllUsersAsync()
    {
        return await _userRepository.GetAllAsync();
    }
}