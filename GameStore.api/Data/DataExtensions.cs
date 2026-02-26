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
                                    new Genre { Name = "Action" },
                                    new Genre { Name = "Adventure" },
                                    new Genre { Name = "RPG" },
                                    new Genre { Name = "Strategy" },
                                    new Genre { Name = "Sports" },
                                    new Genre { Name = "Action-adventure" },
                                    new Genre { Name = "Action RPG" },
                                    new Genre { Name = "Sandbox" }
                                );

                            context.SaveChanges();
                        }
                    }
                );
            }
        );
    }
}
