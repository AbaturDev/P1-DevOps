using Taskly.Api.Tasks.Features.Create;
using Taskly.Api.Tasks.Features.Delete;
using Taskly.Api.Tasks.Features.Get;

namespace Taskly.Api.Tasks;

public static class TaskEndpoints
{
    public static RouteGroupBuilder MapTaskEndpoints(this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/tasks")
            .WithTags(nameof(TaskEndpoints));

        group.MapGet("", GetTasks.HandleAsync);
        group.MapPost("", CreateTask.HandleAsync);
        group.MapDelete("/{id:guid}", DeleteTask.HandleAsync);

        return group;
    }
}
