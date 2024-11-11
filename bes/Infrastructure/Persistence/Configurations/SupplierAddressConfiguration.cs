using BES.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BES.Infrastructure.Persistence.Configurations;

public class SupplierAddressConfiguration : IEntityTypeConfiguration<SupplierAddress>
{
    public void Configure(EntityTypeBuilder<SupplierAddress> builder)
    {
        builder.Property(e => e.Id).HasColumnName("ID");
        builder.Property(e => e.PostCode).HasMaxLength(10);
        builder.Property(e => e.AddressType).HasMaxLength(50);
        builder.Property(e => e.Suburb).HasMaxLength(50);
        builder.Property(e => e.State).HasMaxLength(50);
        
        builder.HasOne(d => d.Supplier)
            .WithMany(p => p.SupplierAddresses)
            .HasForeignKey(d => d.SupplierId);
    }
}