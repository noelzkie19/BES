using BES.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BES.Infrastructure.Persistence.Configurations;

public class SupplierEmailHistoryConfiguration : IEntityTypeConfiguration<SupplierEmailHistory>
{
    public void Configure(EntityTypeBuilder<SupplierEmailHistory> builder)
    {
        builder.Property(e => e.Id).HasColumnName("ID");
        
        builder.HasOne(d => d.Supplier)
            .WithMany(p => p.SupplierEmailHistories)
            .HasForeignKey(d => d.SupplierId);
    }
}