using GameStore.Data;
using GameStore.Dtos;
using Microsoft.EntityFrameworkCore;

namespace GameStore.Endpoints;

public static class GenresEndpoints
{
    public static void MapGenresEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/genres");

        // GET genres
        group.MapGet(
            "/",
            async (GameStoreContext dbcontext) =>
                await dbcontext
                    .Genres.Select(genre => new GenreDto(genre.Id, genre.Name))
                    .AsNoTracking()
                    .ToListAsync()
        );

        // GET genre by id /genres/{id}
        group.MapGet(
            "/{id}",
            async (int id, GameStoreContext dbcontext) =>
            {
                var genre = await dbcontext.Genres.FindAsync(id);

                if (genre is null)
                {
                    return Results.NotFound();
                }

                return Results.Ok(new GenreDto(genre.Id, genre.Name));
            }
        );
    }
}
