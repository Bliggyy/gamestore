namespace GameStore.Dtos;

public record CartInfoDto(
    int GameId,
    string Name,
    string Username,
    string? ImageUrl,
    decimal Price
);
