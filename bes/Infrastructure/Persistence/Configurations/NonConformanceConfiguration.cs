using BES.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BES.Infrastructure.Persistence.Configurations;

public class NonConformanceConfiguration : IEntityTypeConfiguration<NonConformance>
{
    public void Configure(EntityTypeBuilder<NonConformance> builder)
    {
        builder.Property(e => e.Id).HasColumnName("ID");
        builder.Property(e => e.DateRecorded).HasColumnType("datetime");
        builder.Property(e => e.ReviewDate).HasColumnType("datetime");
        builder.Property(e => e.CompletedDate).HasColumnType("datetime");
        builder.Property(e => e.NcrClearedDate).HasColumnType("datetime");


        builder.HasQueryFilter(e => !EF.Property<DateTime?>(e, "Deleted").HasValue);
    }
}