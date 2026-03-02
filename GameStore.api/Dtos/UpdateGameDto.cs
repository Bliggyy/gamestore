using System.ComponentModel.DataAnnotations;

namespace GameStore.Dtos;

public record UpdateGameDto
{
    [Required]
    [StringLength(50)]
    public string Name { get; set; } = string.Empty;

    [Range(1, 50)]
    public int GenreId { get; set; }

    [Range(1, 100)]
    public decimal Price { get; set; }
    public DateOnly ReleaseDate { get; set; }
    public IFormFile? Image { get; set; }
};
