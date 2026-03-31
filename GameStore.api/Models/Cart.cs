using System.ComponentModel.DataAnnotations.Schema;

namespace GameStore.Models;

public class Cart
{
    public int Id { get; set; }
    public required string User { get; set; }

    [ForeignKey("Game")]
    public int GameId { get; set; }
    public required Game Game { get; set; }
}
