using BES.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BES.Infrastructure.Persistence.Configurations;

public class OperationConfiguration : IEntityTypeConfiguration<Operation>
{
    public void Configure(EntityTypeBuilder<Operation> builder)
    {
        builder.Property(e => e.Id).HasColumnName("ID");
        builder.Property(e => e.DateCompleted).HasColumnType("datetime");
        // builder.Property(e => e.Description).HasMaxLength(50);
        builder.Property(e => e.JobId).HasColumnName("JobID");
        // builder.Property(e => e.Notes).HasMaxLength(50);
        // builder.Property(e => e.QuoteId).HasColumnName("QuoteID");
        builder.HasOne(d => d.Job)
            .WithMany(p => p.Operations)
            .HasForeignKey(d => d.JobId)
            .OnDelete(DeleteBehavior.ClientSetNull)
            .HasConstraintName("FK_Operation_Job");


        builder.HasQueryFilter(e => !EF.Property<DateTime?>(e, "Deleted").HasValue);
        // builder.HasOne(d => d.Quote)
        //     .WithMany(p => p.Operations)
        //     .HasForeignKey(d => d.QuoteId)
        //     .OnDelete(DeleteBehavior.ClientSetNull)
        //     .HasConstraintName("FK_Operation_Quote");
    }
}