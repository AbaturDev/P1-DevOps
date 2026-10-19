using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Taskly.Database.Configurations.Abstractions;
using Taskly.Database.Entities;

namespace Taskly.Database.Configurations;

public sealed class TaskItemConfiguration : BaseEntityConfiguration<TaskItem>
{
    public const int TitleMaxLength = 200;
    public const int DescriptionMaxLength = 2000;

    public override void Configure(EntityTypeBuilder<TaskItem> builder)
    {
        base.Configure(builder);

        builder.ToTable("tasks");

        builder.Property(x => x.Title)
            .IsRequired()
            .HasMaxLength(TitleMaxLength);

        builder.Property(x => x.Description)
            .HasMaxLength(DescriptionMaxLength);
    }
}
