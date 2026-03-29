using GameStore.Data;
using GameStore.Endpoints;
using GameStore.Services;

var builder = WebApplication.CreateBuilder(args);

builder.SetAuthentication();

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

builder.Services.AddAntiforgery();
builder.Services.AddValidation();
builder.Services.AddAuthorization();
builder.AddGameStoreDb();

var app = builder.Build();

app.UseCors(corsPolicyName);
app.UseAuthentication();
app.UseAuthorization();
app.UseAntiforgery();

app.UseStaticFiles();
app.MapAuthEndpoints();
app.MapGamesEndpoints();
app.MapGenresEndpoints();
app.MigrateDb();

app.Run();
