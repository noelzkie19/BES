using BES.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BES.Infrastructure.Persistence.Configurations;

public class ResourceConfiguration : IEntityTypeConfiguration<Resource>
{
    public void Configure(EntityTypeBuilder<Resource> builder)
    {
        builder.Property(e => e.Id).HasColumnName("ID");
        builder.Property(e => e.Description).HasMaxLength(50);
        builder.Property(e => e.HourlyRate).HasColumnType("money");
        builder.Property(e => e.Name).HasMaxLength(50);
    }
}