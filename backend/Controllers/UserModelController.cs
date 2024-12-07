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

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("your_super_secret_key"));
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
        public async Task<ActionResult<UserModel>> Login([FromBody] UserModel userModel)
        {
            //Administrator access
            string? token;
            if (userModel is { Username: "admin", Password: "admin" })
            {
                token = GenerateJwtToken(userModel.Username);
                return Ok(new { token });
            }

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
            return Ok(new { token });
        }

        [HttpPost("register")]
        [Authorize]
        public async Task<ActionResult<UserModel>> Register([FromBody] UserModel userModel)
        {
            var passwordHasher = new PasswordHasher<UserModel>();
            
            userModel.Password = passwordHasher.HashPassword(userModel, userModel.Password!);
            
            
            _context.Users.Add(userModel);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error");
            }
            
            
            
            return Ok(new {Message = "User registered successfully "} );
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