using BES.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BES.Infrastructure.Persistence.Configurations;

public class ClientContactConfiguration : IEntityTypeConfiguration<ClientContact>
{
    public void Configure(EntityTypeBuilder<ClientContact> builder)
    {
        builder.Property(e => e.Id).HasColumnName("ID");
        builder.Property(e => e.ClientId).HasColumnName("ClientID");
        builder.Property(e => e.ContactName).HasMaxLength(50);
        builder.Property(e => e.Email).HasMaxLength(50);
        builder.Property(e => e.Mobile).HasMaxLength(50);
        builder.Property(e => e.Phone).HasMaxLength(50);
        builder.Property(e => e.Position).HasMaxLength(50);
        builder.HasOne(d => d.Client)
            .WithMany(p => p.ClientContacts)
            .HasForeignKey(d => d.ClientId)
            .HasConstraintName("FK_ClientContact_Client");
    }
}