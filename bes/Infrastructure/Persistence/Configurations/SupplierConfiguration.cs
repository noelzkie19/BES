using BES.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BES.Infrastructure.Persistence.Configurations;

public class SupplierConfiguration : IEntityTypeConfiguration<Supplier>
{
    public void Configure(EntityTypeBuilder<Supplier> builder)
    {
        builder.Property(e => e.Id).HasColumnName("ID");
        builder.Property(e => e.AccountId).HasColumnName("AccountID");
        builder.Property(e => e.Name).HasMaxLength(50);
        builder.Property(e => e.Fax).HasMaxLength(50);
        builder.Property(e => e.Phone).HasMaxLength(50);
        builder.Property(e => e.Email).HasMaxLength(50);
        builder.Property(e => e.ContactPerson).HasMaxLength(50);
        builder.Property(e => e.OperatingHrs).HasMaxLength(50);
        
        builder.HasOne(d => d.Account)
            .WithMany(p => p.Suppliers)
            .HasForeignKey(d => d.AccountId)
            .HasConstraintName("FK_Supplier_Accounts");

        builder.HasQueryFilter(e => !EF.Property<DateTime?>(e, "Deleted").HasValue);
    }
}