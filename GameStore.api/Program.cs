using GameStore.Data;
using GameStore.Endpoints;

var builder = WebApplication.CreateBuilder(args);

var corsSection = builder.Configuration.GetSection("CorsConfig");
var corsPolicyName = corsSection.GetValue<string>("PolicyName")!;
var allowedOrigins = corsSection.GetSection("AllowedOrigins").Get<string[]>()!;

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        corsPolicyName,
        policy =>
        {
            policy.WithOrigins(allowedOrigins).AllowAnyMethod().AllowAnyHeader();
        }
    );
});

builder.Services.AddValidation();
builder.AddGameStoreDb();

var app = builder.Build();

app.UseStaticFiles();
app.UseCors(corsPolicyName);
app.MapGamesEndpoints();
app.MapGenresEndpoints();
app.MigrateDb();

app.Run();
