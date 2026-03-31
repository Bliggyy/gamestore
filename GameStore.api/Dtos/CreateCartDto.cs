namespace GameStore.Dtos;

public record CreateCartDto(
    int GameId,
    string Name,
    string Username,
    string? ImageUrl,
    decimal Price
);
