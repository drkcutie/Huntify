using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using NuGet.Protocol.Plugins;

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
        [Authorize]
        public async Task<ActionResult<UserModel>> GetUserModel(int id)
        {
            var userModel = await _context.Users.FindAsync(id);

            if (userModel == null)
            {
                return NotFound();
            }

            return userModel;
        }

        private string GenerateJwtToken(string username)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, username),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("your_very_long_secret_key_of_at_least_32_bytes!"));
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
            //Administrator access
            string? token;
            // if (userModel is { Username: "admin123", Password: "admin123" })
            // {
            //     token = GenerateJwtToken("admin123");
            //     return Ok(new { token });
            // }

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

            token = GenerateJwtToken(user.Username!);
            return Ok(new {token});
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserModel>> Register([FromBody] RegisterDTO registerDto)
        {
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Username
                == registerDto.Username || u.Email == registerDto.Email);
            if (existingUser is not null)
            {
                return BadRequest(new {Message = "User already exists"});
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
            userModel.Password = passwordHasher.HashPassword(userModel , registerDto.Password!);
            registerClientOrServiceProvider(registerDto, userModel);
            
            _context.Users.Add(userModel);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception e )
            {
                return StatusCode(500, "An error occurred while registering user");
            }
            
            return Ok(new {Message = "User registered successfully "} );
        }

        private static void registerClientOrServiceProvider(RegisterDTO registerDto, UserModel userModel)
        {
            if (registerDto.AccountType == AccountType.Client)
            {
                userModel.Client  = new Client
                {
                    User = userModel
                };
            }
            else
            {
                userModel.ServiceProvider = new ServiceProviderModel 
                {
                    User = userModel
                };
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