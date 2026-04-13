using GameStore.Data.Seeding;
using GameStore.Models;
using Microsoft.EntityFrameworkCore;

namespace GameStore.Data;

public static class DataExtensions
{
    public static void MigrateDb(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<GameStoreContext>();
        dbContext.Database.Migrate();
    }

    public static void AddGameStoreDb(this WebApplicationBuilder builder)
    {
        var connString = builder.Configuration.GetConnectionString("GameStore");

        // DbContext has a scoped service lifetime because:
        // 1. It is designed to be used for a single unit of work, such as a web request.
        // 2. It is not thread-safe, so it should not be shared across multiple threads or requests.
        // 3. It can be expensive to create and dispose of, so it is more efficient to reuse it within a single request.
        // 4. Makes it easier to manage transactions and ensure data consistency within a single request.

        builder.Services.AddSqlite<GameStoreContext>(
            connString,
            optionsAction: options =>
            {
                options.UseSeeding(
                    (context, _) =>
                    {
                        if (!context.Set<Genre>().Any())
                        {
                            context
                                .Set<Genre>()
                                .AddRange(
                                    SeedData.SeedGenres.Select(g => new Genre { Name = g.Name })
                                );

                            context.SaveChanges();
                        }

                        if (!context.Set<Game>().Any())
                        {
                            var genreMap = context
                                .Set<Genre>()
                                .ToDictionary(g => g.Name, g => g.Id);

                            foreach (var g in SeedData.SeedGames)
                            {
                                Image? image = null;

                                if (g.ImageUrl != null)
                                {
                                    image = new Image
                                    {
                                        Url = g.ImageUrl,
                                        Caption = g.Name,
                                        IsMain = true,
                                    };
                                    context.Set<Image>().Add(image);
                                    context.SaveChanges();
                                }

                                context
                                    .Set<Game>()
                                    .Add(
                                        new Game
                                        {
                                            Name = g.Name,
                                            Description = g.Description,
                                            GenreId = genreMap[g.Genre],
                                            Price = g.Price,
                                            ReleaseDate = g.ReleaseDate,
                                            ImageId = image?.Id,
                                        }
                                    );
                            }

                            context.SaveChanges();
                        }
                    }
                );
            }
        );
    }
}
