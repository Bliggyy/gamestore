using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace GameStore.Models;

public class Game
{
    public int Id { get; set; }
    public required string Name { get; set; }

    [ForeignKey("Genre")]
    public int GenreId { get; set; }
    public Genre? Genre { get; set; }
    public decimal Price { get; set; }
    public DateOnly ReleaseDate { get; set; }
    public Image? Images { get; set; }
}
