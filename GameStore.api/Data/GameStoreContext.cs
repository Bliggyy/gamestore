using GameStore.Models;
using Microsoft.EntityFrameworkCore;

namespace GameStore.Data;

public class GameStoreContext(DbContextOptions<GameStoreContext> options) : DbContext(options)
{
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .Entity<Game>()
            .HasOne(g => g.Image)
            .WithOne()
            .HasForeignKey<Game>(g => g.ImageId)
            .OnDelete(DeleteBehavior.Cascade);
        modelBuilder.Entity<Cart>().HasOne(c => c.Game).WithMany().HasForeignKey(c => c.GameId);
        modelBuilder
            .Entity<OwnedGames>()
            .HasOne(og => og.Game)
            .WithMany()
            .HasForeignKey(og => og.GameId);
    }

    public DbSet<Game> Games => Set<Game>();
    public DbSet<Genre> Genres => Set<Genre>();
    public DbSet<Image> Images => Set<Image>();
    public DbSet<Cart> Carts => Set<Cart>();
    public DbSet<OwnedGames> OwnedGames => Set<OwnedGames>();
}
