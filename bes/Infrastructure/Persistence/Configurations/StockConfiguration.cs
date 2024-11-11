using BES.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BES.Infrastructure.Persistence.Configurations;

public class StockConfiguration : IEntityTypeConfiguration<Stock>
{
    public void Configure(EntityTypeBuilder<Stock> builder)
    {
        builder.Property(e => e.Id).HasColumnName("ID");
        builder.Property(e => e.JobId).HasColumnName("JobID");
        builder.HasOne(d => d.Job)
            .WithMany(p => p.Stocks)
            .HasForeignKey(d => d.JobId)
            .OnDelete(DeleteBehavior.ClientSetNull)
            .HasConstraintName("FK_Stock_Job");
    }
}