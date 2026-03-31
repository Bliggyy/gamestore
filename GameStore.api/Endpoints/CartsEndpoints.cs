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

        // POST add to cart
        userRoutes.MapPost(
            "/",
            async (CartInfoDto request, GameStoreContext dbcontext) =>
            {
                var gameItem = await dbcontext.Games.FindAsync(request.GameId);

                if (gameItem == null)
                {
                    return Results.NotFound($"Game with id {request.GameId} not found.");
                }

                var cartItem = await dbcontext.Carts.FirstOrDefaultAsync(cart =>
                    cart.User == request.Username && cart.GameId == request.GameId
                );

                if (cartItem != null)
                {
                    return Results.BadRequest(
                        $"Game with id {request.GameId} is already in the cart for user {request.Username}."
                    );
                }

                var cart = new Cart
                {
                    GameId = request.GameId,
                    Game = gameItem,
                    User = request.Username,
                };

                dbcontext.Carts.Add(cart);
                await dbcontext.SaveChangesAsync();

                return Results.Created(
                    $"/carts/{cart.Id}",
                    new
                    {
                        id = cart.Id,
                        gameId = cart.GameId,
                        username = cart.User,
                    }
                );
            }
        );

        // DELETE remove from cart
        userRoutes.MapDelete(
            "/",
            async (string username, int gameId, GameStoreContext dbcontext) =>
            {
                var cartItem = await dbcontext.Carts.FirstOrDefaultAsync(cart =>
                    cart.User == username && cart.GameId == gameId
                );

                if (cartItem == null)
                {
                    return Results.NotFound($"Cart item not found.");
                }

                dbcontext.Carts.Remove(cartItem);
                await dbcontext.SaveChangesAsync();

                return Results.NoContent();
            }
        );
    }
}
