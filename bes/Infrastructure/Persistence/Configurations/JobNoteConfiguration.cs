using BES.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BES.Infrastructure.Persistence.Configurations;

public class JobNoteConfiguration : IEntityTypeConfiguration<JobNote>
{
    public void Configure(EntityTypeBuilder<JobNote> builder)
    {
        builder.Property(e => e.Id).HasColumnName("ID");
        builder.Property(e => e.Date).HasColumnType("datetime");
        builder.Property(e => e.JobId).HasColumnName("JobID");
        builder.HasOne(d => d.Job)
            .WithMany(p => p.JobNotes)
            .HasForeignKey(d => d.JobId)
            .OnDelete(DeleteBehavior.ClientSetNull)
            .HasConstraintName("FK_JobNote_Job");
         builder.HasQueryFilter(e => !EF.Property<DateTime?>(e, "Deleted").HasValue);
    }
}