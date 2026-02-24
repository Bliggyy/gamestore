using GameStore.Dtos;

const string GetGameEndpointName = "GetGame";

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

List<GameDto> games =
[
    new GameDto(
        1,
        "The Legend of Zelda: Breath of the Wild",
        "Action-adventure",
        59.99m,
        new DateOnly(2017, 3, 3)
    ),
    new GameDto(2, "Super Mario Odyssey", "Platformer", 59.99m, new DateOnly(2017, 10, 27)),
    new GameDto(3, "Red Dead Redemption 2", "Action-adventure", 59.99m, new DateOnly(2018, 10, 26)),
    new GameDto(4, "The Witcher 3: Wild Hunt", "Action RPG", 39.99m, new DateOnly(2015, 5, 19)),
    new GameDto(5, "Minecraft", "Sandbox", 26.95m, new DateOnly(2011, 11, 18)),
];

// GET games
app.MapGet("/games", () => games);

// GET game by id /games/{id}
app.MapGet("/games/{id}", (int id) => games.Find(game => game.Id == id))
    .WithName(GetGameEndpointName);

// POST game /games
app.MapPost(
    "/games",
    (CreateGameDto game) =>
    {
        GameDto newGame = new(games.Count + 1, game.Name, game.Genre, game.Price, game.ReleaseDate);
        games.Add(newGame);

        return Results.CreatedAtRoute(GetGameEndpointName, new { id = newGame.Id }, newGame);
    }
);

// PUT game /games/{id}
app.MapPut(
    "/games/{id}",
    (int id, UpdateGameDto updatedGame) =>
    {
        int index = games.FindIndex(game => game.Id == id);

        games[index] = new GameDto(
            id,
            updatedGame.Name,
            updatedGame.Genre,
            updatedGame.Price,
            updatedGame.ReleaseDate
        );

        return Results.NoContent();
    }
);

// DELETE game /games/{id}
app.MapDelete(
    "/games/{id}",
    (int id) =>
    {
        int index = games.FindIndex(game => game.Id == id);

        if (index == -1)
        {
            return Results.NotFound();
        }

        games.RemoveAt(index);

        return Results.NoContent();
    }
);

app.Run();
