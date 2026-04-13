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
                $"/images/{ImageNames[0]}.jpg"
            ),
            (
                "Dark Souls III",
                "A challenging action RPG set in a dark fantasy world.",
                "Action",
                29.99m,
                new DateOnly(2016, 4, 12),
                $"/images/{ImageNames[1]}.jpg"
            ),
            (
                "Civilization VI",
                "Build an empire to stand the test of time in this turn-based strategy game.",
                "Strategy",
                29.99m,
                new DateOnly(2016, 10, 21),
                $"/images/{ImageNames[2]}.jpg"
            ),
            (
                "Resident Evil Village",
                "A first-person survival horror game with intense atmosphere.",
                "Horror",
                39.99m,
                new DateOnly(2021, 5, 7),
                $"/images/{ImageNames[3]}.jpg"
            ),
            (
                "FIFA 24",
                "The latest entry in the long-running football simulation series.",
                "Sports",
                59.99m,
                new DateOnly(2023, 9, 29),
                $"/images/{ImageNames[4]}.jpg"
            ),
            (
                "Elden Ring",
                "An open-world action RPG developed by FromSoftware and George R.R. Martin.",
                "Action RPG",
                59.99m,
                new DateOnly(2022, 2, 25),
                $"/images/{ImageNames[5]}.jpg"
            ),
            (
                "Sekiro: Shadows Die Twice",
                "A samurai action game focused on precise sword combat.",
                "Action",
                39.99m,
                new DateOnly(2019, 3, 22),
                $"/images/{ImageNames[6]}.jpg"
            ),
            (
                "XCOM 2",
                "Lead a resistance force against alien invaders in this turn-based strategy game.",
                "Strategy",
                19.99m,
                new DateOnly(2016, 2, 5),
                $"/images/{ImageNames[7]}.avif"
            ),
            (
                "Alien: Isolation",
                "A survival horror game where you must evade a terrifying alien creature.",
                "Horror",
                24.99m,
                new DateOnly(2014, 10, 7),
                $"/images/{ImageNames[8]}.jpg"
            ),
            (
                "NBA 2K24",
                "A basketball simulation game with deep career and team modes.",
                "Sports",
                59.99m,
                new DateOnly(2023, 9, 8),
                $"/images/{ImageNames[9]}.jpg"
            ),
            (
                "Kingdom Come: Deliverance",
                "A realistic open-world RPG set in medieval Bohemia.",
                "RPG",
                29.99m,
                new DateOnly(2018, 2, 13),
                $"/images/{ImageNames[10]}.jpg"
            ),
            (
                "Red Dead Redemption 2",
                "An epic tale of life in America's unforgiving heartland.",
                "Action-adventure",
                39.99m,
                new DateOnly(2018, 10, 26),
                $"/images/{ImageNames[11]}.jpg"
            ),
            (
                "osu!",
                "A free-to-win rhythm game with community-created beatmaps.",
                "Rhythm",
                0.00m,
                new DateOnly(2007, 9, 16),
                $"/images/{ImageNames[12]}.png"
            ),
            (
                "Counter-Strike 2",
                "The next evolution of the world's most popular tactical shooter.",
                "Shooter",
                0.00m,
                new DateOnly(2023, 9, 27),
                $"/images/{ImageNames[13]}.jpg"
            ),
            (
                "Manor Lords",
                "A medieval strategy game blending city-building with tactical battles.",
                "Simulation",
                39.99m,
                new DateOnly(2024, 4, 26),
                $"/images/{ImageNames[14]}.jpg"
            ),
            (
                "Hollow Knight",
                "A challenging action-adventure through a vast underground kingdom.",
                "Indie",
                14.99m,
                new DateOnly(2017, 2, 24),
                $"/images/{ImageNames[15]}.jpg"
            ),
            (
                "Valorant",
                "A 5v5 character-based tactical shooter from Riot Games.",
                "Shooter",
                0.00m,
                new DateOnly(2020, 6, 2),
                $"/images/{ImageNames[16]}.jpg"
            ),
            (
                "Ghost of Tsushima",
                "An open-world samurai adventure set during the Mongol invasion of Japan.",
                "Action-adventure",
                49.99m,
                new DateOnly(2020, 7, 17),
                $"/images/{ImageNames[17]}.jpg"
            ),
            (
                "Apex Legends",
                "A free-to-play battle royale hero shooter set in the Titanfall universe.",
                "Shooter",
                0.00m,
                new DateOnly(2019, 2, 4),
                $"/images/{ImageNames[18]}.jpg"
            ),
            (
                "Battlefield 2042",
                "A large-scale multiplayer shooter set in a near-future warzone.",
                "Shooter",
                29.99m,
                new DateOnly(2021, 11, 19),
                $"/images/{ImageNames[19]}.jpg"
            ),
        ];
    }
}
