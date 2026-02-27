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
                            game.Image?.Url,
                            game.Price,
                            game.ReleaseDate
                        )
                    );
                }
            )
            .WithName(GetGameEndpointName);

        // POST game /games with file upload
        group.MapPost(
            "/",
            async (HttpRequest request, IWebHostEnvironment env, GameStoreContext dbcontext) =>
            {
                var form = await request.ReadFormAsync();
                var file = form.Files.FirstOrDefault();

                var name = form["name"].ToString();
                var genreId = int.Parse(form["genreId"].ToString());
                var priceStr = form["price"].ToString();
                var price = decimal.Parse(priceStr);
                var releaseDate = DateOnly.Parse(form["releaseDate"].ToString());

                int? imageId = null;

                // Handle image upload if provided
                if (file != null && file.Length > 0)
                {
                    var uploadsFolder = Path.Combine(env.WebRootPath ?? "wwwroot", "images");
                    Directory.CreateDirectory(uploadsFolder);

                    var ext = Path.GetExtension(file.FileName);
                    var filename = $"{Guid.NewGuid()}{ext}";
                    var filePath = Path.Combine(uploadsFolder, filename);

                    await using (var stream = File.Create(filePath))
                    {
                        await file.CopyToAsync(stream);
                    }

                    var image = new Image
                    {
                        Url = $"/images/{filename}",
                        Caption = null,
                        IsMain = true,
                    };

                    dbcontext.Images.Add(image);
                    await dbcontext.SaveChangesAsync();
                    imageId = image.Id;
                }

                var newGame = new Game
                {
                    Name = name,
                    GenreId = genreId,
                    ImageId = imageId,
                    Price = price,
                    ReleaseDate = releaseDate,
                };

                dbcontext.Games.Add(newGame);
                await dbcontext.SaveChangesAsync();

                var gameWithRelations = await dbcontext
                    .Games.Include(g => g.Genre)
                    .Include(g => g.Image)
                    .FirstOrDefaultAsync(g => g.Id == newGame.Id);

                GameDetailsDto gameDto = new(
                    gameWithRelations!.Id,
                    gameWithRelations.Name,
                    gameWithRelations.Genre!.Name,
                    gameWithRelations.Image?.Url,
                    gameWithRelations.Price,
                    gameWithRelations.ReleaseDate
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
