using BES.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BES.Infrastructure.Persistence.Configurations;

public class DeliveryLineConfigure : IEntityTypeConfiguration<DeliveryLine>
{
    public void Configure(EntityTypeBuilder<DeliveryLine> builder)
    {
        builder.Property(e => e.Id).HasColumnName("ID");

        builder.HasOne(d => d.Delivery)
           .WithMany(p => p.DeliveryLines)
           .HasPrincipalKey(p => p.DeliveryNumber)
           .HasForeignKey(d => d.DeliveryNumber)
           .OnDelete(DeleteBehavior.ClientSetNull);


        builder.HasOne(d => d.Job)
            .WithMany(p => p.DeliveryLines)
            .HasPrincipalKey(p => p.Id)
            .HasForeignKey(p => p.JobId)
            .OnDelete(DeleteBehavior.ClientSetNull);

    }
}