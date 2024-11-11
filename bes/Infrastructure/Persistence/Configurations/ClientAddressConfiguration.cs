using BES.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BES.Infrastructure.Persistence.Configurations;

public class ClientAddressConfiguration : IEntityTypeConfiguration<ClientAddress>
{
    public void Configure(EntityTypeBuilder<ClientAddress> builder)
    {
        builder.Property(e => e.Id).HasColumnName("ID");
        builder.Property(e => e.PostCode).HasMaxLength(10);
        builder.Property(e => e.AddressType).HasMaxLength(50);
        builder.Property(e => e.Suburb).HasMaxLength(50);
        builder.Property(e => e.State).HasMaxLength(50);
        builder.HasOne(d => d.Client)
            .WithMany(p => p.ClientAddresses)
            .HasForeignKey(d => d.ClientId)
            .HasConstraintName("FK_ClientAddress_Client");
    }
}