using BES.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BES.Infrastructure.Persistence.Configurations;

public class DeliveryConfiguration : IEntityTypeConfiguration<Delivery>
{
    public void Configure(EntityTypeBuilder<Delivery> builder)
    {
        builder.Property(e => e.Id).HasColumnName("ID");
        builder.Property(e => e.City).HasMaxLength(50);
        builder.Property(e => e.CreatedBy).HasMaxLength(50);
        builder.Property(e => e.Date).HasColumnType("datetime");
        builder.Property(e => e.ExportMyob).HasColumnName("ExportMYOB");
        builder.Property(e => e.Freight).HasColumnType("money");
        builder.Property(e => e.PostCode).HasMaxLength(10);
        builder.Property(e => e.State).HasMaxLength(50);
        builder.Property(e => e.Street).HasMaxLength(50);
    }
}