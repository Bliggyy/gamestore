using GameStore.Dtos;
using GameStore.Handlers;
using Microsoft.AspNetCore.Mvc;

namespace GameStore.Endpoints;

public static class AuthEndpoints
{
    public static void MapAuthEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/auth");

        group.MapPost("/login", AuthHandler.Login);
        group
            .MapPost("/validate-token", (Delegate)AuthHandler.ValidateToken)
            .RequireAuthorization();
    }
}
