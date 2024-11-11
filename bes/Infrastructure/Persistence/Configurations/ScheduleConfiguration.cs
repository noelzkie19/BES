using BES.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BES.Infrastructure.Persistence.Configurations;

public class ScheduleConfiguration : IEntityTypeConfiguration<Schedule>
{
    public void Configure(EntityTypeBuilder<Schedule> builder)
    {
        builder.HasOne(d => d.Job)
            .WithOne(p => p.Schedule)
            .HasPrincipalKey<Job>(d => d.Id)
            .HasForeignKey<Schedule>(d => d.JobId)
            .OnDelete(DeleteBehavior.ClientSetNull);
    }
}