using BES.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BES.Infrastructure.Persistence.Configurations;

public class MaterialConfiguration : IEntityTypeConfiguration<Material>
{
    public void Configure(EntityTypeBuilder<Material> builder)
    {
        builder.Property(e => e.Id).HasColumnName("ID");
        builder.Property(e => e.DeliveryDate).HasColumnType("datetime");
        builder.Property(e => e.Description).HasMaxLength(50);
        builder.Property(e => e.JobId).HasColumnName("JobID");
        builder.Property(e => e.NumberOrdered).HasMaxLength(50);
        builder.Property(e => e.OrderDate).HasColumnType("datetime");
        builder.Property(e => e.Size).HasMaxLength(50);
        builder.Property(e => e.SupplierId).HasColumnName("SupplierID");

        builder.HasOne(d => d.Job)
            .WithMany(p => p.Materials)
            .HasForeignKey(d => d.JobId)
            .OnDelete(DeleteBehavior.ClientSetNull)
            .HasConstraintName("FK_Material_Job");
        builder.HasOne(d => d.Supplier)
            .WithMany(p => p.Materials)
            .HasForeignKey(d => d.SupplierId)
            .OnDelete(DeleteBehavior.ClientSetNull)
            .HasConstraintName("FK_Material_Supplier");
        builder.HasOne(d => d.Quote)
            .WithMany(p => p.Materials)
            .HasPrincipalKey(p => p.Number)
            .HasForeignKey(d => d.QuoteNumber)
            .OnDelete(DeleteBehavior.ClientSetNull);

        builder.HasQueryFilter(e => !EF.Property<DateTime?>(e, "Deleted").HasValue);
    }
}