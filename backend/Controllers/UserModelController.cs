using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserModelController : ControllerBase
    {
        private readonly SeekrDbContext _context;

        public UserModelController(SeekrDbContext context)
        {
            _context = context;
        }

        // GET: api/UserModel
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserModel>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        // GET: api/UserModel/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserModel>> GetUserModel(int id)
        {
            var userModel = await _context.Users.FindAsync(id);

            if (userModel == null)
            {
                return NotFound();
            }
            return userModel;
        }

        private async Task<ActionResult<string>> GenerateJwtToken(string username, int userId)
        {
            string role ;
            int roleId ;
            
            var user = await _context.Users.Include(userModel => userModel.Client)
                .Include(userModel => userModel.ServiceProvider).FirstOrDefaultAsync(u => u.Id == userId);
            if (user == null)
            {
             Console.WriteLine("User Not found");
                return NotFound("User does not exist");
            }

            Console.WriteLine("This is the user" + user.Client);
            if (user.Client != null)
            {
                Console.WriteLine("User is a client");
                role = "Client";
                roleId = user.Client.ClientId;
            }
            else if (user.ServiceProvider != null)
            {
                Console.WriteLine("User is a service provider");
                role = "ServiceProvider";
                roleId = user.ServiceProvider.ServiceProviderId;
            }
            else
            {
                Console.WriteLine("User has no associated role");
                return NotFound("User has no associated role");
            }

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, username),
                new Claim("id", userId.ToString()),
                new Claim("role", role),
                new Claim("roleId", roleId.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes("your_very_long_secret_key_of_at_least_32_bytes!"));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: "http://localhost:5000",
                audience: "http://localhost:3000",
                claims: claims,
                expires: DateTime.Now.AddMinutes(90),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        // PUT: api/UserModel/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserModel(int id, UserModel userModel)
        {
            if (id != userModel.Id)
            {
                return BadRequest();
            }

            _context.Entry(userModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserModelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserModel>> Login([FromBody] LoginDTO userModel)
        {

            if (string.IsNullOrEmpty(userModel.Username) || string.IsNullOrEmpty(userModel.Password))
            {
                return BadRequest("Username and password is required.");
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == userModel.Username);
            if (user == null)
            {
                return Unauthorized("Invalid username and password");
            }

            var passwordHasher = new PasswordHasher<UserModel>();
            var result = passwordHasher.VerifyHashedPassword(user, user.Password!, userModel.Password);

            if (result == PasswordVerificationResult.Failed)
            {
                return Unauthorized("Invalid username and password");
            }

            var getToken= await GenerateJwtToken(user.Username!, user.Id);
            return Ok(new { tokenResult = new
            {
                result = "success",
                token = getToken.Value
            } });
            
        }

        [Authorize]
        [HttpGet("profile")]
        public Task<ActionResult<UserModel>> GetProfile()
        {
            var identity = HttpContext.User.Identities as ClaimsIdentity;
            if (identity == null)
            {
                return Task.FromResult<ActionResult<UserModel>>(Unauthorized());
            }

            var userId = identity.FindFirst("id")?.Value; // Retrieve user id from token
            var username = identity.FindFirst(ClaimTypes.Name)?.Value; // Retrieve username from token

            return Task.FromResult<ActionResult<UserModel>>(Ok(new { UserId = userId, Username = username }));
        }

        [Authorize]
        [HttpGet("getClient")]
        public async Task<ActionResult<UserModel>> GetClientUsingUserId()
        {
            var identity = HttpContext.User.Identities as ClaimsIdentity;
            if (identity == null)
            {
                return Unauthorized();
            }

            var userIdFromToken = identity.FindFirst("id")?.Value; // Retrieve user id from token
            var username = identity.FindFirst(ClaimTypes.Name)?.Value; // Retrieve username from token

            if (!int.TryParse(userIdFromToken, out int userId))
            {
                return BadRequest("Invalid user id");
            }

            var client = await _context.Clients
                .Where(u => u.UserId == userId) // Assuming UserId is an integer in your table
                .FirstOrDefaultAsync();

            if (client == null)
            {
                return NotFound("Client does not exist");
            }

            return Ok(new { clientId = client.ClientId, Username = username });
        }

        [Authorize]
        [HttpGet("getServiceProvider")]
        public async Task<ActionResult<UserModel>> GetServiceProviderUsingUserId()
        {
            var identity = HttpContext.User.Identities as ClaimsIdentity;
            if (identity == null)
            {
                return Unauthorized();
            }

            var userIdFromToken = identity.FindFirst("id")?.Value; // Retrieve user id from token
            var username = identity.FindFirst(ClaimTypes.Name)?.Value; // Retrieve username from token

            if (!int.TryParse(userIdFromToken, out int userId))
            {
                return BadRequest("Invalid user id");
            }

            var serviceProvider = await _context.ServiceProviders
                .Where(u => u.UserId == userId) // Assuming UserId is an integer in your table
                .FirstOrDefaultAsync();

            if (serviceProvider == null)
            {
                return NotFound("Client does not exist");
            }

            return Ok(new { clientId = serviceProvider.ServiceProviderId, Username = username });
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserModel>> Register([FromBody] RegisterDTO registerDto)
        {
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Username
                == registerDto.Username || u.Email == registerDto.Email);
            if (existingUser is not null)
            {
                return BadRequest(new { Message = "User already exists" });
            }

            var userModel = new UserModel
            {
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                DateOfBirth = registerDto.DateOfBirth,
                Email = registerDto.Email,
                Username = registerDto.Username,
                Password = registerDto.Password
            };
            //Hash Password
            var passwordHasher = new PasswordHasher<UserModel>();
            userModel.Password = passwordHasher.HashPassword(userModel, registerDto.Password);
            RegisterClientOrServiceProvider(registerDto, userModel);

            _context.Users.Add(userModel);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                return StatusCode(500, "An error occurred while registering user: "  + e);
            }

            return Ok(new { Message = "User registered successfully " });
        }

        private static void RegisterClientOrServiceProvider(RegisterDTO registerDto, UserModel userModel)
        {
            if (registerDto.AccountType == AccountType.Client)
            {
                userModel.Client = new Client
                {
                    User = userModel
                };
            }
            else if (registerDto.AccountType == AccountType.ServiceProvider)
            {
                userModel.ServiceProvider = new ServiceProviderModel
                {
                    User = userModel
                };
            }
            else
            {
                throw new ArgumentException("Invalid account type provided");
            }
        }

        // DELETE: api/UserModel/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteUserModel(int id)
        {
            var userModel = await _context.Users.FindAsync(id);
            if (userModel == null)
            {
                return NotFound();
            }

            _context.Users.Remove(userModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserModelExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}