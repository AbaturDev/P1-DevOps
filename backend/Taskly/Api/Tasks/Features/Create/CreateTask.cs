using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Taskly.Api.Tasks.Dtos;
using Taskly.Api.Tasks.Dtos.Requests;
using Taskly.Api.Tasks.Mappers;
using Taskly.Database;
using Taskly.Database.Configurations;
using Taskly.Database.Entities;

namespace Taskly.Api.Tasks.Features.Create;

public static class CreateTask
{
    public static async Task<Results<Created<TaskDto>, BadRequest<ProblemDetails>>> HandleAsync(
        CreateTaskRequest request,
        [FromServices] TasklyDbContext context,
        CancellationToken ct)
    {
        if (string.IsNullOrWhiteSpace(request.Title) || request.Title.Length > TaskItemConfiguration.TitleMaxLength)
        {
            return TypedResults.BadRequest(new ProblemDetails
            {
                Status = StatusCodes.Status400BadRequest,
                Title = "Invalid title",
                Detail = $"Title is required and must be at most {TaskItemConfiguration.TitleMaxLength} characters."
            });
        }

        if (request.Description?.Length > TaskItemConfiguration.DescriptionMaxLength)
        {
            return TypedResults.BadRequest(new ProblemDetails
            {
                Status = StatusCodes.Status400BadRequest,
                Title = "Invalid description",
                Detail = $"Description must be at most {TaskItemConfiguration.DescriptionMaxLength} characters."
            });
        }

        var task = new TaskItem
        {
            Title = request.Title.Trim(),
            Description = string.IsNullOrWhiteSpace(request.Description) ? null : request.Description.Trim()
        };

        context.Tasks.Add(task);
        await context.SaveChangesAsync(ct);

        var dto = TaskMappers.MapToDto(task);

        return TypedResults.Created($"/api/tasks/{dto.Id}", dto);
    }
}
