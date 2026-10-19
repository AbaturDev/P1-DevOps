namespace Taskly.Api.Tasks.Dtos.Requests;

public sealed record CreateTaskRequest
{
    public required string Title { get; init; }
    public string? Description { get; init; }
}
