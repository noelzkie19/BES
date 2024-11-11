using BES.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BES.Infrastructure.Persistence.Configurations;

public class SupplierApprovalConfigure : IEntityTypeConfiguration<SupplierApproval>
{
    public void Configure(EntityTypeBuilder<SupplierApproval> builder)
    {
        builder.HasOne(d => d.Supplier)
            .WithOne(p => p.SupplierApproval)
            .HasForeignKey<SupplierApproval>(d => d.SupplierId);
    }
}