namespace GameStore.Services;

public static class CorsService
{
    public static void SetCors(
        this WebApplicationBuilder builder,
        IConfigurationSection corsSection
    )
    {
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
    }
}
