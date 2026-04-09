using System.ComponentModel.DataAnnotations.Schema;

namespace GameStore.Models;

public class OwnedGames
{
    public int Id { get; set; }
    public string User { get; set; } = null!;

    [ForeignKey("Game")]
    public int GameId { get; set; }
    public required Game Game { get; set; }
}
