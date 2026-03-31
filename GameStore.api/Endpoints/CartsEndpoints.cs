using GameStore.Data;
using GameStore.Dtos;
using GameStore.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GameStore.Endpoints;

public static class CartsEndpoints
{
    const string GetCartEndpointName = "GetCart";

    public static void MapCartsEndpoints(this WebApplication app)
    {
        var publicRoutes = app.MapGroup("/carts");
        var privateRoutes = app.MapGroup("/carts").RequireAuthorization();
        var userRoutes = app.MapGroup("/carts").RequireAuthorization("UserPolicy");
        var managerRoutes = app.MapGroup("/carts").RequireAuthorization("ManagerPolicy");
        var adminRoutes = app.MapGroup("/carts").RequireAuthorization("AdminPolicy");

        // GET carts
        userRoutes.MapGet(
            "/",
            async (string? username, GameStoreContext dbcontext) =>
            {
                return await dbcontext
                    .Carts.Where(cart => cart.User == username)
                    .AsNoTracking()
                    .Select(cart => new CartDetailsDto(
                        cart.Id,
                        cart.Game.Name,
                        cart.Game.Image != null ? cart.Game.Image.Url : string.Empty,
                        cart.Game.Price
                    ))
                    .ToListAsync();
            }
        );
    }
}
