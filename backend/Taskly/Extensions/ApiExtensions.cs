using Taskly.Options;

namespace Taskly.Extensions;

public static class ApiExtensions
{
    public static void AddApiConfiguration(this IHostApplicationBuilder builder)
    {
        builder.Services.AddProblemDetails();
        builder.Services.AddOpenApi();

        var cors = builder.Configuration.GetSection(CorsOptions.SectionName).Get<CorsOptions>();
        
        builder.Services.AddCors(options =>
        {
            options.AddDefaultPolicy(b =>
            {
                if (cors is null)
                {
                    return;
                }
                
                b.WithOrigins(cors.Origins)
                    .WithMethods(cors.Methods)
                    .WithHeaders(cors.Headers)
                    .WithExposedHeaders(cors.ExposedHeaders);

                if (cors.AllowCredentials)
                {
                    b.AllowCredentials();
                }
                else
                {
                    b.DisallowCredentials();
                }
            });
        });
    }

    public static void UseApiConfiguration(this WebApplication app)
    {
        app.UseCors();

        if (app.Environment.IsDevelopment())
        {
            app.MapOpenApi();
        }
        
        app.UseHttpsRedirection();
    }
}
