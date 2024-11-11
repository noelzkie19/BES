using BES.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BES.Infrastructure.Persistence.Configurations;

public class ClientEmailHistoryConfiguration : IEntityTypeConfiguration<ClientEmailHistory>
{
    public void Configure(EntityTypeBuilder<ClientEmailHistory> builder)
    {
        builder.Property(e => e.Id).HasColumnName("Id");
        builder.HasOne(d => d.Client)
            .WithMany(p => p.ClientEmailHistories)
            .HasForeignKey(d => d.ClientId);
    }
}