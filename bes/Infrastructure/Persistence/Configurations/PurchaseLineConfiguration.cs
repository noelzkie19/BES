using BES.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BES.Infrastructure.Persistence.Configurations;

public class PurchaseLineConfiguration : IEntityTypeConfiguration<PurchaseLine>
{
    public void Configure(EntityTypeBuilder<PurchaseLine> builder)
    {
        builder.Property(e => e.Id).HasColumnName("ID");
        builder.Property(e => e.AccountNumber).HasMaxLength(50);
        builder.Property(e => e.CostEach).HasColumnType("money");
        builder.Property(e => e.CostTotal).HasColumnType("money");
        builder.Property(e => e.Description).HasMaxLength(200);
        builder.Property(e => e.DueDate).HasColumnType("datetime");

        builder.HasOne(d => d.Purchase)
            .WithMany(p => p.PurchaseLines)
            .HasPrincipalKey(p => p.PurchaseNumber)
            .HasForeignKey(d => d.PurchaseNumber)
            .OnDelete(DeleteBehavior.ClientSetNull);

        builder.HasOne(d => d.Job)
            .WithMany(p => p.PurchaseLines)
            .HasPrincipalKey(p => p.Id)
            .HasForeignKey(d => d.JobId)
            .OnDelete(DeleteBehavior.ClientSetNull);

        // builder.HasQueryFilter(e => !EF.Property<DateTime?>(e, "Deleted").HasValue);
    }
}