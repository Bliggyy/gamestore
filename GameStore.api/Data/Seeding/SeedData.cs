using GameStore.Models;

namespace GameStore.Data.Seeding
{
    public static class SeedData
    {
        public static readonly List<Genre> SeedGenres =
        [
            new() { Name = "Action" },
            new() { Name = "Adventure" },
            new() { Name = "RPG" },
            new() { Name = "Strategy" },
            new() { Name = "Sports" },
            new() { Name = "Action-adventure" },
            new() { Name = "Action RPG" },
            new() { Name = "Sandbox" },
            new() { Name = "Horror" },
            new() { Name = "Shooter" },
            new() { Name = "Rhythm" },
            new() { Name = "Simulation" },
            new() { Name = "Indie" },
        ];

        public static readonly List<string> ImageNames =
        [
            "the-witcher-3",
            "dark-souls-3",
            "civilization-6",
            "resident-evil-village",
            "fifa-24",
            "elden-ring",
            "sekiro-shadows-die-twice",
            "xcom-2",
            "alien-isolation",
            "nba-2k24",
            "kingdom-come-deliverance",
            "red-dead-redemption-2",
            "osu",
            "counter-strike-2",
            "manor-lords",
            "hollow-knight",
            "valorant",
            "ghost-of-tsushima",
            "apex-legends",
            "battlefield-2042",
        ];

        public static readonly List<(
            string Name,
            string Description,
            string Genre,
            decimal Price,
            DateOnly ReleaseDate,
            string ImageUrl
        )> SeedGames =
        [
            (
                "The Witcher 3: Wild Hunt",
                "An open-world RPG with rich storytelling and vast exploration.",
                "RPG",
                19.99m,
                new DateOnly(2015, 5, 19),
                "https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg"
            ),
            (
                "Dark Souls III",
                "A challenging action RPG set in a dark fantasy world.",
                "Action",
                29.99m,
                new DateOnly(2016, 4, 12),
                "https://media.rawg.io/media/games/da1/da1b267764d77221f07a4386b6548e5a.jpg"
            ),
            (
                "Civilization VI",
                "Build an empire to stand the test of time in this turn-based strategy game.",
                "Strategy",
                29.99m,
                new DateOnly(2016, 10, 21),
                "https://media.rawg.io/media/games/021/021c4e21a1824d2526f925eff6735d33.jpg"
            ),
            (
                "Resident Evil Village",
                "A first-person survival horror game with intense atmosphere.",
                "Horror",
                39.99m,
                new DateOnly(2021, 5, 7),
                "https://media.rawg.io/media/games/f24/f2493b7e5a91f48d8b8f51c2b2bffd2c.jpg"
            ),
            (
                "FIFA 24",
                "The latest entry in the long-running football simulation series.",
                "Sports",
                59.99m,
                new DateOnly(2023, 9, 29),
                "https://media.rawg.io/media/games/5eb/5eb49eb2fa0738fdb5bacea557b1bc57.jpg"
            ),
            (
                "Elden Ring",
                "An open-world action RPG developed by FromSoftware and George R.R. Martin.",
                "Action RPG",
                59.99m,
                new DateOnly(2022, 2, 25),
                "https://media.rawg.io/media/games/b29/b294fdd866dcdb643e7bab370a552855.jpg"
            ),
            (
                "Sekiro: Shadows Die Twice",
                "A samurai action game focused on precise sword combat.",
                "Action",
                39.99m,
                new DateOnly(2019, 3, 22),
                "https://media.rawg.io/media/games/67f/67f62d1f062a6164f57575e0604ee9f6.jpg"
            ),
            (
                "XCOM 2",
                "Lead a resistance force against alien invaders in this turn-based strategy game.",
                "Strategy",
                19.99m,
                new DateOnly(2016, 2, 5),
                "https://media.rawg.io/media/games/8e4/8e4de3f54ac659e08a7ba6a2b731682a.jpg"
            ),
            (
                "Alien: Isolation",
                "A survival horror game where you must evade a terrifying alien creature.",
                "Horror",
                24.99m,
                new DateOnly(2014, 10, 7),
                "https://media.rawg.io/media/games/b03/b03e5a9d531e9a4b9917b15a1d65778e.jpg"
            ),
            (
                "NBA 2K24",
                "A basketball simulation game with deep career and team modes.",
                "Sports",
                59.99m,
                new DateOnly(2023, 9, 8),
                "https://media.rawg.io/media/games/5eb/5eb49eb2fa0738fdb5bacea557b1bc57.jpg"
            ),
            (
                "Kingdom Come: Deliverance",
                "A realistic open-world RPG set in medieval Bohemia.",
                "RPG",
                29.99m,
                new DateOnly(2018, 2, 13),
                "https://media.rawg.io/media/games/e6d/e6de699bd788497f4b52e2f41f9698f9.jpg"
            ),
            (
                "Red Dead Redemption 2",
                "An epic tale of life in America's unforgiving heartland.",
                "Action-adventure",
                39.99m,
                new DateOnly(2018, 10, 26),
                "https://media.rawg.io/media/games/511/5118aff5091cb3efec399c808f8c598f.jpg"
            ),
            (
                "osu!",
                "A free-to-win rhythm game with community-created beatmaps.",
                "Rhythm",
                0.00m,
                new DateOnly(2007, 9, 16),
                "https://media.rawg.io/media/games/9fa/9fa63622543e5d4f6d99aa9d73b043de.jpg"
            ),
            (
                "Counter-Strike 2",
                "The next evolution of the world's most popular tactical shooter.",
                "Shooter",
                0.00m,
                new DateOnly(2023, 9, 27),
                "https://media.rawg.io/media/games/736/73619bd336c894d6941d926bfd563946.jpg"
            ),
            (
                "Manor Lords",
                "A medieval strategy game blending city-building with tactical battles.",
                "Simulation",
                39.99m,
                new DateOnly(2024, 4, 26),
                "https://media.rawg.io/media/games/784/784597f4dbe7bbdce61cc530a8a40eb1.jpg"
            ),
            (
                "Hollow Knight",
                "A challenging action-adventure through a vast underground kingdom.",
                "Indie",
                14.99m,
                new DateOnly(2017, 2, 24),
                "https://media.rawg.io/media/games/4cf/4cfc6b7f1850590a4634b08bfab308ab.jpg"
            ),
            (
                "Valorant",
                "A 5v5 character-based tactical shooter from Riot Games.",
                "Shooter",
                0.00m,
                new DateOnly(2020, 6, 2),
                "https://media.rawg.io/media/games/b11/b115b2bc6a5957a917bc7601f4abdda2.jpg"
            ),
            (
                "Ghost of Tsushima",
                "An open-world samurai adventure set during the Mongol invasion of Japan.",
                "Action-adventure",
                49.99m,
                new DateOnly(2020, 7, 17),
                "https://media.rawg.io/media/games/f46/f466571d536f2e3ea9e815ad17177501.jpg"
            ),
            (
                "Apex Legends",
                "A free-to-play battle royale hero shooter set in the Titanfall universe.",
                "Shooter",
                0.00m,
                new DateOnly(2019, 2, 4),
                "https://media.rawg.io/media/games/b72/b7233d5d5b1e75e86bb860ccc7aeca85.jpg"
            ),
            (
                "Battlefield 2042",
                "A large-scale multiplayer shooter set in a near-future warzone.",
                "Shooter",
                29.99m,
                new DateOnly(2021, 11, 19),
                "https://media.rawg.io/media/games/fd9/fd9574112074e8a99a3fce200b1d86c6.jpg"
            ),
        ];
    }
}
