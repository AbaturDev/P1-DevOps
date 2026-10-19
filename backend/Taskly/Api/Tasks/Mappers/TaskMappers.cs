using Taskly.Api.Tasks.Dtos;
using Taskly.Database.Entities;

namespace Taskly.Api.Tasks.Mappers;

public static class TaskMappers
{
    public static TaskDto MapToDto(TaskItem task)
    {
        return new TaskDto
        {
            Id = task.Id,
            Title = task.Title,
            Description = task.Description,
            CreatedAt = task.CreatedAt,
            ModifiedAt = task.ModifiedAt
        };
    }
}
