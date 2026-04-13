using GameStore.Data.Seeding;
using GameStore.Models;
using Microsoft.EntityFrameworkCore;

namespace GameStore.Data;

public class GameStoreContext(DbContextOptions<GameStoreContext> options, IWebHostEnvironment env)
    : DbContext(options)
{
    private readonly IWebHostEnvironment _env = env;

    public override int SaveChanges()
    {
        DeleteOrphanedImages();
        return base.SaveChanges();
    }

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        DeleteOrphanedImages();
        return await base.SaveChangesAsync(cancellationToken);
    }

    private void DeleteOrphanedImages()
    {
        var deletedImages = ChangeTracker
            .Entries<Image>()
            .Where(e => e.State == EntityState.Deleted)
            .Select(e => e.Entity)
            .ToList();

        foreach (var image in deletedImages)
        {
            if (
                string.IsNullOrEmpty(image.Url)
                || image.Url.StartsWith("http")
                || ImagePartofSeedData(image.Url)
            )
            {
                continue;
            }

            var filePath = Path.Combine(_env.WebRootPath, image.Url.TrimStart('/'));
            if (File.Exists(filePath))
            {
                File.Delete(filePath);
            }
        }
    }

    public static bool ImagePartofSeedData(string url)
    {
        foreach (var imageName in SeedData.ImageNames)
        {
            if (url.Contains(imageName))
            {
                return true;
            }
        }

        return false;
    }

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
