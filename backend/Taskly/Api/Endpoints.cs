using Taskly.Api.Tasks;

namespace Taskly.Api;

public static class Endpoints
{
    public static void RegisterEndpoints(this WebApplication app)
    {
        app.MapTaskEndpoints();
    }
}
