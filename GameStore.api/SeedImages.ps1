$images = @(
    @{ Name = "the-witcher-3"; Url = "https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg" },
    @{ Name = "dark-souls-3"; Url = "https://media.rawg.io/media/games/da1/da1b267764d77221f07a4386b6548e5a.jpg" },
    @{ Name = "civilization-6"; Url = "https://media.rawg.io/media/games/021/021c4e21a1824d2526f925eff6735d33.jpg" },
    @{ Name = "resident-evil-village"; Url = "https://media.rawg.io/media/games/f24/f2493b7e5a91f48d8b8f51c2b2bffd2c.jpg" },
    @{ Name = "fifa-24"; Url = "https://media.rawg.io/media/games/5eb/5eb49eb2fa0738fdb5bacea557b1bc57.jpg" },
    @{ Name = "elden-ring"; Url = "https://media.rawg.io/media/games/b29/b294fdd866dcdb643e7bab370a552855.jpg" },
    @{ Name = "sekiro"; Url = "https://media.rawg.io/media/games/67f/67f62d1f062a6164f57575e0604ee9f6.jpg" },
    @{ Name = "xcom-2"; Url = "https://media.rawg.io/media/games/8e4/8e4de3f54ac659e08a7ba6a2b731682a.jpg" },
    @{ Name = "alien-isolation"; Url = "https://media.rawg.io/media/games/b03/b03e5a9d531e9a4b9917b15a1d65778e.jpg" },
    @{ Name = "nba-2k24"; Url = "https://media.rawg.io/media/games/5eb/5eb49eb2fa0738fdb5bacea557b1bc57.jpg" },
    @{ Name = "kingdom-come-deliverance"; Url = "https://media.rawg.io/media/games/e6d/e6de699bd788497f4b52e2f41f9698f9.jpg" },
    @{ Name = "red-dead-redemption-2"; Url = "https://media.rawg.io/media/games/511/5118aff5091cb3efec399c808f8c598f.jpg" },
    @{ Name = "osu"; Url = "https://media.rawg.io/media/games/9fa/9fa63622543e5d4f6d99aa9d73b043de.jpg" },
    @{ Name = "counter-strike-2"; Url = "https://media.rawg.io/media/games/736/73619bd336c894d6941d926bfd563946.jpg" },
    @{ Name = "manor-lords"; Url = "https://media.rawg.io/media/games/784/784597f4dbe7bbdce61cc530a8a40eb1.jpg" },
    @{ Name = "hollow-knight"; Url = "https://media.rawg.io/media/games/4cf/4cfc6b7f1850590a4634b08bfab308ab.jpg" },
    @{ Name = "valorant"; Url = "https://media.rawg.io/media/games/b11/b115b2bc6a5957a917bc7601f4abdda2.jpg" },
    @{ Name = "ghost-of-tsushima"; Url = "https://media.rawg.io/media/games/f46/f466571d536f2e3ea9e815ad17177501.jpg" },
    @{ Name = "apex-legends"; Url = "https://media.rawg.io/media/games/b72/b7233d5d5b1e75e86bb860ccc7aeca85.jpg" },
    @{ Name = "battlefield-2042"; Url = "https://media.rawg.io/media/games/fd9/fd9574112074e8a99a3fce200b1d86c6.jpg" }
)

$outputDir = "./wwwroot/images"
New-Item -ItemType Directory -Force -Path $outputDir | Out-Null

foreach ($image in $images) {
    $outputPath = "$outputDir/$($image.Name).jpg"
    Write-Host "Downloading $($image.Name)..."
    Invoke-WebRequest -Uri $image.Url -OutFile $outputPath
}

Write-Host "Done! All images saved to $outputDir"