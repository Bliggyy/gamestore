using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using GameStore.Data;
using GameStore.Dtos;
using Microsoft.IdentityModel.Tokens;

namespace GameStore.Handlers;

public class AuthHandler
{
    public static async Task<IResult> Login(LoginRequestDto request, IConfiguration configuration)
    {
        // Using hardcoded credentials for demonstration purposes. In a real application, you would validate against a database.
        var findUser = UserMap.Users.FirstOrDefault(user =>
            user.username == request.Username && user.password == request.Password
        );

        if (findUser == default)
        {
            return Results.Unauthorized();
        }

        var token = GenerateJwtToken(request.Username, findUser.role, configuration);
        return Results.Ok(new { Token = token });
    }

    public static string GenerateJwtToken(
        string username,
        string role,
        IConfiguration configuration
    )
    {
        var claims = new[]
        {
            new Claim(ClaimTypes.Name, username),
            new Claim(ClaimTypes.Role, role),
        };

        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(configuration["JwtConfig:SecretKey"]!)
        );
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var token = new JwtSecurityToken(
            issuer: configuration["JwtConfig:Issuer"],
            audience: configuration["JwtConfig:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddHours(8),
            signingCredentials: creds
        );
        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public static async Task<IResult> ValidateToken(HttpContext httpContext)
    {
        var username = httpContext.User.Identity?.Name;

        return Results.Ok(new { Message = $"Token is valid. Welcome, {username}!" });
    }
}
