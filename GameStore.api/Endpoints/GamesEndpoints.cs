using GameStore.Data;
using GameStore.Dtos;
using GameStore.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GameStore.Endpoints;

public static class GamesEndpoints
{
    const string GetGameEndpointName = "GetGame";

    public static void MapGamesEndpoints(this WebApplication app)
    {
        var publicRoutes = app.MapGroup("/games");
        var privateRoutes = app.MapGroup("/games").RequireAuthorization();
        var userRoutes = app.MapGroup("/games").RequireAuthorization("UserPolicy");
        var managerRoutes = app.MapGroup("/games").RequireAuthorization("ManagerPolicy");
        var adminRoutes = app.MapGroup("/games").RequireAuthorization("AdminPolicy");

        // GET games
        publicRoutes.MapGet(
            "/",
            async (string? genre, GameStoreContext dbcontext) =>
            {
                var query = dbcontext
                    .Games.Include(game => game.Genre)
                    .Include(game => game.Image)
                    .AsNoTracking()
                    .AsQueryable();

                if (!string.IsNullOrEmpty(genre))
                {
                    query = query.Where(game => game.Genre!.Name == genre);
                }

                return await query
                    .Select(game => new GameDetailsDto(
                        game.Id,
                        game.Name,
                        game.Genre!.Name,
                        game.Image != null ? game.Image.Url : string.Empty,
                        game.Price,
                        game.ReleaseDate
                    ))
                    .ToListAsync();
            }
        );

        // GET game by id /games/{id}
        publicRoutes
            .MapGet(
                "/{id}",
                async (int id, GameStoreContext dbcontext) =>
                {
                    var game = await dbcontext
                        .Games.Include(g => g.Image)
                        .Include(g => g.Genre)
                        .AsNoTracking()
                        .FirstOrDefaultAsync(g => g.Id == id);

                    if (game is null)
                    {
                        return Results.NotFound();
                    }

                    return Results.Ok(
                        new GameDetailsDto(
                            game.Id,
                            game.Name,
                            new { game.Genre!.Id, game.Genre.Name },
                            game.Image != null ? game.Image.Url : string.Empty,
                            game.Price,
                            game.ReleaseDate
                        )
                    );
                }
            )
            .WithName(GetGameEndpointName);

        // POST game /games with file upload
        managerRoutes.MapPost(
            "/",
            async (
                [FromForm] CreateGameDto request,
                IWebHostEnvironment env,
                GameStoreContext dbcontext
            ) =>
            {
                Image? image = null;

                if (request.Image != null && request.Image.Length > 0)
                {
                    if (!IsSupportedImage(request.Image))
                    {
                        return Results.BadRequest(
                            "Unsupported image format. Only .jpg, .jpeg, and .png are allowed."
                        );
                    }

                    var uploadsFolder = Path.Combine(env.WebRootPath ?? "wwwroot", "images");
                    Directory.CreateDirectory(uploadsFolder);

                    var ext = Path.GetExtension(request.Image.FileName);
                    var filename = $"{Guid.NewGuid()}{ext}";
                    var filePath = Path.Combine(uploadsFolder, filename);

                    await using (var stream = File.Create(filePath))
                    {
                        await request.Image.CopyToAsync(stream);
                    }

                    image = new Image
                    {
                        Url = $"/images/{filename}",
                        Caption = null,
                        IsMain = true,
                    };
                }

                var newGame = new Game
                {
                    Name = request.Name,
                    GenreId = request.GenreId,
                    Image = image,
                    Price = request.Price,
                    ReleaseDate = request.ReleaseDate,
                };

                dbcontext.Games.Add(newGame);
                await dbcontext.SaveChangesAsync();

                GameDetailsDto gameDto = await dbcontext
                    .Games.Where(g => g.Id == newGame.Id)
                    .Select(game => new GameDetailsDto(
                        game.Id,
                        game.Name,
                        game.Genre!.Name,
                        game.Image != null ? game.Image.Url : string.Empty,
                        game.Price,
                        game.ReleaseDate
                    ))
                    .AsNoTracking()
                    .FirstAsync();

                return Results.CreatedAtRoute(
                    GetGameEndpointName,
                    new { id = gameDto.Id },
                    gameDto
                );
            }
        );

        // PUT game /games/{id} with file upload
        managerRoutes.MapPut(
            "/{id}",
            async (
                int id,
                [FromForm] UpdateGameDto updatedGame,
                IWebHostEnvironment env,
                GameStoreContext dbcontext
            ) =>
            {
                var existingGame = await dbcontext
                    .Games.Include(g => g.Image)
                    .FirstOrDefaultAsync(g => g.Id == id);

                if (existingGame is null)
                {
                    return Results.NotFound();
                }

                if (updatedGame.Image != null && updatedGame.Image.Length > 0)
                {
                    if (!IsSupportedImage(updatedGame.Image))
                    {
                        return Results.BadRequest(
                            "Unsupported image format. Only .jpg, .jpeg, and .png are allowed."
                        );
                    }

                    var uploadsFolder = Path.Combine(env.WebRootPath ?? "wwwroot", "images");
                    Directory.CreateDirectory(uploadsFolder);

                    var ext = Path.GetExtension(updatedGame.Image.FileName);
                    var filename = $"{Guid.NewGuid()}{ext}";
                    var filePath = Path.Combine(uploadsFolder, filename);

                    await using (var stream = File.Create(filePath))
                    {
                        await updatedGame.Image.CopyToAsync(stream);
                    }

                    if (existingGame.Image != null)
                    {
                        var oldImagePath = Path.Combine(
                            env.WebRootPath ?? "wwwroot",
                            existingGame.Image.Url.TrimStart('/')
                        );

                        if (File.Exists(oldImagePath))
                        {
                            File.Delete(oldImagePath);
                        }

                        existingGame.Image.Url = $"/images/{filename}";
                    }
                    else
                    {
                        existingGame.Image = new Image
                        {
                            Url = $"/images/{filename}",
                            Caption = null,
                            IsMain = true,
                        };
                    }
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
        managerRoutes.MapDelete(
            "/{id}",
            async (int id, IWebHostEnvironment env, GameStoreContext dbcontext) =>
            {
                var game = await dbcontext
                    .Games.Select(g => new { Game = g, g.Image })
                    .FirstOrDefaultAsync(g => g.Game.Id == id);

                if (game is null)
                {
                    return Results.NotFound();
                }

                dbcontext.Games.Remove(game.Game);
                await dbcontext.SaveChangesAsync();

                if (game.Image != null)
                {
                    var imagePath = Path.Combine(
                        env.WebRootPath ?? "wwwroot",
                        game.Image.Url.TrimStart('/')
                    );

                    if (File.Exists(imagePath))
                    {
                        File.Delete(imagePath);
                    }
                }

                return Results.NoContent();
            }
        );

        userRoutes.MapGet(
            "/owned-games",
            async (string user, GameStoreContext dbcontext) =>
            {
                var ownedGames = await dbcontext
                    .OwnedGames.Where(og => og.User == user)
                    .AsNoTracking()
                    .Select(og => new GameDetailsDto(
                        og.Game.Id,
                        og.Game.Name,
                        og.Game.Genre!.Name,
                        og.Game.Image != null ? og.Game.Image.Url : string.Empty,
                        og.Game.Price,
                        og.Game.ReleaseDate
                    ))
                    .ToListAsync();

                return Results.Ok(ownedGames);
            }
        );

        // POST owned-game
        userRoutes.MapPost(
            "/owned-games",
            async (CreateOwnedGameDto request, GameStoreContext dbcontext) =>
            {
                var game = await dbcontext.Games.FindAsync(request.GameId);

                if (game is null)
                {
                    return Results.NotFound("Game not found.");
                }

                var ownedGame = new OwnedGames
                {
                    GameId = request.GameId,
                    User = request.Username,
                    Game = game,
                };

                dbcontext.OwnedGames.Add(ownedGame);
                await dbcontext.SaveChangesAsync();

                return Results.Created($"/games/owned-games/{ownedGame.Id}", null);
            }
        );

        // DELETE owned game /games/owned-games/{id}
        managerRoutes.MapDelete(
            "/owned-games/{id}",
            async (int id, string user, GameStoreContext dbcontext) =>
            {
                var ownedGame = await dbcontext.OwnedGames.FirstOrDefaultAsync(og =>
                    og.GameId == id && og.User == user
                );

                if (ownedGame is null)
                {
                    return Results.NotFound();
                }

                dbcontext.OwnedGames.Remove(ownedGame);
                await dbcontext.SaveChangesAsync();

                return Results.NoContent();
            }
        );
    }

    public static bool IsSupportedImage(IFormFile file)
    {
        string[] allowedExtensions = [".jpg", ".jpeg", ".png"];
        var ext = Path.GetExtension(file.FileName).ToLowerInvariant();
        return allowedExtensions.Contains(ext);
    }
}
