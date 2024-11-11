using BES.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BES.Infrastructure.Persistence.Configurations;

public class PurchaseConfiguration : IEntityTypeConfiguration<Purchase>
{
    public void Configure(EntityTypeBuilder<Purchase> builder)
    {
        builder.Property(e => e.Id).HasColumnName("ID");
        builder.Property(e => e.CreatedBy).HasMaxLength(50);
        builder.Property(e => e.Date).HasColumnType("datetime");
        builder.Property(e => e.ExportMyob).HasColumnName("ExportMYOB");
        builder.Property(e => e.FreightCost).HasColumnType("money");
        builder.Property(e => e.InvoiceText).HasMaxLength(50);
        builder.Property(e => e.PrintedDate).HasColumnType("datetime");
        // builder.HasQueryFilter(e => !EF.Property<DateTime?>(e, "Deleted").HasValue);
    }
}