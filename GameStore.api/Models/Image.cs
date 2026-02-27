using System.ComponentModel.DataAnnotations.Schema;

namespace GameStore.Models;

public class Image
{
    public int Id { get; set; }
    public required string Url { get; set; }
    public string? Caption { get; set; }

    [ForeignKey("Game")]
    public int GameId { get; set; }
    public Game? Game { get; set; }
    public bool IsMain { get; set; }
}
