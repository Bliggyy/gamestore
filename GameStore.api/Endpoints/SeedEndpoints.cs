using GameStore.Data;
using GameStore.Data.Seeding;
using GameStore.Models;
using Microsoft.EntityFrameworkCore;

namespace GameStore.Endpoints;

public static class SeedEndpoints
{
    public static void MapSeedEndpoints(this WebApplication app)
    {
        var adminRoutes = app.MapGroup("/seed").RequireAuthorization("AdminPolicy");

        adminRoutes.MapPost(
            "/",
            async (GameStoreContext db) =>
            {
                var hasGames = await db.Games.AnyAsync();
                var hasGenres = await db.Genres.AnyAsync();

                if (hasGames || hasGenres)
                    return Results.Conflict(
                        "Database already has data. Delete existing data first."
                    );

                var genres = SeedData.SeedGenres.Select(g => new Genre { Name = g.Name }).ToList();
                await db.Genres.AddRangeAsync(genres);
                await db.SaveChangesAsync();

                var genreMap = await db.Genres.ToDictionaryAsync(g => g.Name, g => g.Id);

                var games = SeedData
                    .SeedGames.Select(g => new Game
                    {
                        Name = g.Name,
                        Description = g.Description,
                        GenreId = genreMap[g.Genre],
                        Price = g.Price,
                        ReleaseDate = g.ReleaseDate,
                    })
                    .ToList();

                await db.Games.AddRangeAsync(games);
                await db.SaveChangesAsync();

                return Results.Ok(
                    new
                    {
                        Message = "Seed successful",
                        Genres = genres.Count,
                        Games = games.Count,
                    }
                );
            }
        );

        adminRoutes.MapDelete(
            "/",
            async (GameStoreContext db) =>
            {
                db.Games.RemoveRange(db.Games);
                db.Genres.RemoveRange(db.Genres);
                await db.SaveChangesAsync();

                return Results.Ok(new { Message = "All games and genres deleted." });
            }
        );
    }
}
