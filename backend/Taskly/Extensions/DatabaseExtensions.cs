using Microsoft.EntityFrameworkCore;
using Taskly.Database;

namespace Taskly.Extensions;

public static class DatabaseExtensions
{
    public static void AddDatabase(this IHostApplicationBuilder builder)
    {
        var connectionString = builder.Configuration.GetConnectionString("Database")
            ?? throw new InvalidOperationException("Connection string 'Database' is not configured.");

        builder.Services.AddSingleton(TimeProvider.System);
        builder.Services.AddDbContext<TasklyDbContext>(options => options.UseNpgsql(connectionString));
    }

    public static async Task MigrateDatabase(this WebApplication app)
    {
        await using var scope = app.Services.CreateAsyncScope();
        var context = scope.ServiceProvider.GetRequiredService<TasklyDbContext>();

        await context.Database.MigrateAsync();
    }
}
