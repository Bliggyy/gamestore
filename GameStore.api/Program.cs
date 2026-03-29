using GameStore.Data;
using GameStore.Endpoints;
using GameStore.Services;

var builder = WebApplication.CreateBuilder(args);
var corsSection = builder.Configuration.GetSection("CorsConfig");

builder.SetAuthentication();
builder.SetCors(corsSection);
builder.Services.AddAntiforgery();
builder.Services.AddValidation();
builder.Services.AddAuthorization();
builder.AddGameStoreDb();

var app = builder.Build();

app.UseCors(corsSection.GetValue<string>("PolicyName")!);
app.UseAuthentication();
app.UseAuthorization();
app.UseAntiforgery();

app.UseStaticFiles();
app.MapAuthEndpoints();
app.MapGamesEndpoints();
app.MapGenresEndpoints();
app.MigrateDb();

app.Run();
