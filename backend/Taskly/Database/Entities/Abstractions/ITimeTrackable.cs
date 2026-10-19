namespace Taskly.Database.Entities.Abstractions;

public interface ITimeTrackable
{
    DateTimeOffset CreatedAt { get; set; }
    DateTimeOffset ModifiedAt { get; set; }
}
