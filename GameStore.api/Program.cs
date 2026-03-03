using GameStore.Data;
using GameStore.Endpoints;
using Microsoft.AspNetCore.Authentication.JwtBearer;

var builder = WebApplication.CreateBuilder(args);

builder
    .Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters =
            new Microsoft.IdentityModel.Tokens.TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = builder.Configuration["JwtConfig:Issuer"],
                ValidAudience = builder.Configuration["JwtConfig:Audience"],
                IssuerSigningKey = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(
                    System.Text.Encoding.UTF8.GetBytes(
                        builder.Configuration["JwtConfig:SecretKey"]!
                    )
                ),
            };

        options.Events = new JwtBearerEvents
        {
            OnChallenge = context =>
            {
                context.HandleResponse();

                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                context.Response.ContentType = "application/json";

                var message = "The provided authentication token is invalid or missing.";

                return context.Response.WriteAsync(message);
            },
            OnForbidden = context =>
            {
                context.Response.StatusCode = StatusCodes.Status403Forbidden;
                context.Response.ContentType = "application/json";

                var message = "You do not have permission to access this resource.";

                return context.Response.WriteAsync(message);
            },
        };
    });

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
builder.Services.AddAuthorization();
builder.AddGameStoreDb();

var app = builder.Build();

app.UseCors(corsPolicyName);
app.UseAuthentication();
app.UseAuthorization();

app.UseStaticFiles();
app.MapAuthEndpoints();
app.MapGamesEndpoints();
app.MapGenresEndpoints();
app.MigrateDb();

app.Run();
