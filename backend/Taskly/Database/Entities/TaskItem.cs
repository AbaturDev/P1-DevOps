using Taskly.Database.Entities.Abstractions;

namespace Taskly.Database.Entities;

public sealed class TaskItem : BaseEntity
{
    public required string Title { get; set; }
    public string? Description { get; set; }
}
