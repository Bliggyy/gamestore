using GameStore.Data;
using GameStore.Dtos;
using GameStore.Models;
using Microsoft.EntityFrameworkCore;

namespace GameStore.Endpoints;

public static class GamesEndpoints
{
    const string GetGameEndpointName = "GetGame";

    public static void MapGamesEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/games");

        // GET games
        group.MapGet(
            "/",
            async (GameStoreContext dbcontext) =>
                await dbcontext
                    .Games.Include(game => game.Genre)
                    .Include(game => game.Image)
                    .Select(game => new GameSummaryDto(
                        game.Id,
                        game.Name,
                        game.Genre!.Name,
                        game.Image!.Url,
                        game.Price,
                        game.ReleaseDate
                    ))
                    .AsNoTracking()
                    .ToListAsync()
        );

        // GET game by id /games/{id}
        group
            .MapGet(
                "/{id}",
                async (int id, GameStoreContext dbcontext) =>
                {
                    var game = await dbcontext.Games.FindAsync(id);

                    if (game is null)
                    {
                        return Results.NotFound();
                    }

                    return Results.Ok(
                        new GameDetailsDto(
                            game.Id,
                            game.Name,
                            game.GenreId,
                            game.Price,
                            game.ReleaseDate
                        )
                    );
                }
            )
            .WithName(GetGameEndpointName);

        // POST game /games
        group.MapPost(
            "/",
            async (CreateGameDto game, GameStoreContext dbcontext) =>
            {
                Game newGame = new()
                {
                    Name = game.Name,
                    GenreId = game.GenreId,
                    Price = game.Price,
                    ReleaseDate = game.ReleaseDate,
                };

                dbcontext.Games.Add(newGame);
                await dbcontext.SaveChangesAsync();

                GameDetailsDto gameDto = new(
                    newGame.Id,
                    newGame.Name,
                    newGame.GenreId,
                    newGame.Price,
                    newGame.ReleaseDate
                );

                return Results.CreatedAtRoute(
                    GetGameEndpointName,
                    new { id = gameDto.Id },
                    gameDto
                );
            }
        );

        // PUT game /games/{id}
        group.MapPut(
            "/{id}",
            async (int id, UpdateGameDto updatedGame, GameStoreContext dbcontext) =>
            {
                var existingGame = await dbcontext.Games.FindAsync(id);

                if (existingGame is null)
                {
                    return Results.NotFound();
                }

                existingGame.Name = updatedGame.Name;
                existingGame.GenreId = updatedGame.GenreId;
                existingGame.Price = updatedGame.Price;
                existingGame.ReleaseDate = updatedGame.ReleaseDate;

                await dbcontext.SaveChangesAsync();

                return Results.NoContent();
            }
        );

        // DELETE game /games/{id}
        group.MapDelete(
            "/{id}",
            async (int id, GameStoreContext dbcontext) =>
            {
                await dbcontext.Games.Where(game => game.Id == id).ExecuteDeleteAsync();

                return Results.NoContent();
            }
        );
    }
}
