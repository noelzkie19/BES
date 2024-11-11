using BES.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BES.Infrastructure.Persistence.Configurations;

public class AccountConfiguration : IEntityTypeConfiguration<Account>
{
    public void Configure(EntityTypeBuilder<Account> builder)
    {
        builder.Property(e => e.Id).HasColumnName("ID");
        builder.Property(e => e.Email).HasMaxLength(50);
        builder.Property(e => e.Name).HasMaxLength(50);
        builder.Property(e => e.Number).HasMaxLength(50);
        builder.Property(e => e.Type).HasMaxLength(50);
    }
}