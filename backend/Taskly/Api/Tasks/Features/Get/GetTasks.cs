using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Taskly.Api.Tasks.Dtos;
using Taskly.Api.Tasks.Mappers;
using Taskly.Database;

namespace Taskly.Api.Tasks.Features.Get;

public static class GetTasks
{
    public static async Task<Ok<List<TaskDto>>> HandleAsync(
        [FromServices] TasklyDbContext context,
        CancellationToken ct)
    {
        var tasks = await context.Tasks
            .AsNoTracking()
            .OrderBy(x => x.CreatedAt)
            .ToListAsync(ct);

        var dtos = tasks.Select(TaskMappers.MapToDto).ToList();

        return TypedResults.Ok(dtos);
    }
}
