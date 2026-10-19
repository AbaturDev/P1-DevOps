using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Taskly.Database;

namespace Taskly.Api.Tasks.Features.Delete;

public static class DeleteTask
{
    public static async Task<Results<NoContent, NotFound<ProblemDetails>>> HandleAsync(
        Guid id,
        [FromServices] TasklyDbContext context,
        CancellationToken ct)
    {
        var task = await context.Tasks.FirstOrDefaultAsync(x => x.Id == id, ct);

        if (task is null)
        {
            return TypedResults.NotFound(new ProblemDetails
            {
                Status = StatusCodes.Status404NotFound,
                Title = "Task not found",
                Detail = "Task for specified id is not found"
            });
        }

        context.Tasks.Remove(task);
        await context.SaveChangesAsync(ct);

        return TypedResults.NoContent();
    }
}
