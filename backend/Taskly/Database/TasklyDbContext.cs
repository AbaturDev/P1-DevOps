using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Taskly.Database.Entities;
using Taskly.Database.Entities.Abstractions;

namespace Taskly.Database;

public sealed class TasklyDbContext : DbContext
{
    private readonly TimeProvider _timeProvider;

    public TasklyDbContext(DbContextOptions<TasklyDbContext> options, TimeProvider timeProvider) : base(options)
    {
        _timeProvider = timeProvider;

        ChangeTracker.StateChanged += UpdateTimestamps;
        ChangeTracker.Tracked += UpdateTimestamps;
    }

    public DbSet<TaskItem> Tasks { get; init; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfigurationsFromAssembly(typeof(TasklyDbContext).Assembly);
    }

    private void UpdateTimestamps(object? sender, EntityEntryEventArgs e)
    {
        if (e.Entry.Entity is not ITimeTrackable timeTrackable)
        {
            return;
        }

        var now = _timeProvider.GetUtcNow();

        switch (e.Entry.State)
        {
            case EntityState.Added:
                timeTrackable.CreatedAt = now;
                timeTrackable.ModifiedAt = now;
                return;
            case EntityState.Modified:
                timeTrackable.ModifiedAt = now;
                return;
        }
    }
}
