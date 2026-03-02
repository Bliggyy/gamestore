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
                        game.Image != null ? game.Image.Url : string.Empty,
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
                            game.Genre!.Name,
                            game.Image != null ? game.Image.Url : string.Empty,
                            game.Price,
                            game.ReleaseDate
                        )
                    );
                }
            )
            .WithName(GetGameEndpointName);

        // POST game /games with file upload
        group
            .MapPost(
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
            )
            .DisableAntiforgery();

        // PUT game /games/{id} with file upload
        group
            .MapPut(
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
            )
            .DisableAntiforgery();

        // DELETE game /games/{id}
        group.MapDelete(
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
    }

    public static bool IsSupportedImage(IFormFile file)
    {
        string[] allowedExtensions = [".jpg", ".jpeg", ".png"];
        var ext = Path.GetExtension(file.FileName).ToLowerInvariant();
        return allowedExtensions.Contains(ext);
    }
}
