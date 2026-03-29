using GameStore.Data;
using GameStore.Dtos;
using GameStore.Models;
using Microsoft.EntityFrameworkCore;

namespace GameStore.Endpoints;

public static class GenresEndpoints
{
    public static void MapGenresEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/genres");
        var managerGroup = app.MapGroup("/genres").RequireAuthorization("ManagerPolicy");
        var adminGroup = app.MapGroup("/genres").RequireAuthorization("AdminPolicy");

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

        // POST create new genre
        managerGroup.MapPost(
            "/",
            async (CreateGenreDto request, GameStoreContext dbcontext) =>
            {
                var genre = new Genre { Name = request.Name };
                dbcontext.Genres.Add(genre);
                await dbcontext.SaveChangesAsync();

                return Results.Created($"/genres/{genre.Id}", new GenreDto(genre.Id, genre.Name));
            }
        );

        // PUT update genre
        adminGroup.MapPut(
            "/{id}",
            async (int id, CreateGenreDto request, GameStoreContext dbcontext) =>
            {
                var genre = await dbcontext.Genres.FindAsync(id);

                if (genre is null)
                {
                    return Results.NotFound();
                }

                genre.Name = request.Name;
                await dbcontext.SaveChangesAsync();

                return Results.NoContent();
            }
        );

        // DELETE genre
        adminGroup.MapDelete(
            "/{id}",
            async (int id, GameStoreContext dbcontext) =>
            {
                var genre = await dbcontext.Genres.FindAsync(id);

                if (genre is null)
                {
                    return Results.NotFound();
                }

                dbcontext.Genres.Remove(genre);
                await dbcontext.SaveChangesAsync();

                return Results.NoContent();
            }
        );
    }
}
