using GameStore.Data;
using GameStore.Endpoints;
using GameStore.Services;

var builder = WebApplication.CreateBuilder(args);
var corsSection = builder.Configuration.GetSection("CorsConfig");

builder.SetAuthentication();
builder.SetCors(corsSection);
builder.Services.AddAntiforgery();
builder.Services.AddValidation();
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy(
        "UserPolicy",
        policy => policy.RequireRole(Roles.User, Roles.Admin, Roles.Manager)
    );
    options.AddPolicy("ManagerPolicy", policy => policy.RequireRole(Roles.Manager, Roles.Admin));
    options.AddPolicy("AdminPolicy", policy => policy.RequireRole(Roles.Admin));
});
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
app.MapCartsEndpoints();
app.MigrateDb();

var port = Environment.GetEnvironmentVariable("PORT") ?? "8080";
var url = $"http://0.0.0.0:{port}";
app.Run(url);
