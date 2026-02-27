namespace GameStore.Dtos;

// DTO is used to transfer data between layers of the application, such as from the
// database to the client. It can contain properties that represent the data we want to expose
// to the client, and it can also include validation attributes to ensure that the data is valid
// before it is sent to the client. DTO = Data Transfer Object
public record GameDetailsDto(
    int Id,
    string Name,
    int GenreId,
    int? ImageId,
    decimal Price,
    DateOnly ReleaseDate
);
