namespace Taskly.Database.Entities.Abstractions;

public abstract class BaseEntity : ITimeTrackable
{
    public Guid Id { get; init; }
    public DateTimeOffset CreatedAt { get; set; }
    public DateTimeOffset ModifiedAt { get; set; }
}
