using BES.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BES.Infrastructure.Persistence.Configurations;

public class PurchaseReceiptConfiguration : IEntityTypeConfiguration<PurchaseReceipt>
{
    public void Configure(EntityTypeBuilder<PurchaseReceipt> builder)
    {
        builder.Property(e => e.Id).HasColumnName("ID");
        builder.Property(e => e.CreatedBy).HasMaxLength(50);
        builder.Property(e => e.Date).HasColumnType("datetime");
        builder.Property(e => e.ReceiptMyob).HasColumnName("ReceiptMYOB");


        builder.HasOne(d => d.PurchaseLine)
            .WithMany(p => p.PurchaseReceipts)
            .HasPrincipalKey(p => p.PurchaseLineNumber)
            .HasForeignKey(d => d.PurchaseLineNumber)
            .OnDelete(DeleteBehavior.ClientSetNull)
            .HasConstraintName("FK_PurchaseReceipt_PurchaseLine");
            
        builder.HasQueryFilter(e => !EF.Property<DateTime?>(e, "Deleted").HasValue);
    }
}