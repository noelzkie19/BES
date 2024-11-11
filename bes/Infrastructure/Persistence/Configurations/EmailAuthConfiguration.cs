using BES.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
public class EmailAuthConfiguration : IEntityTypeConfiguration<EmailAuth>
{
    public void Configure(EntityTypeBuilder<EmailAuth> builder)
    {
        builder.Property(e => e.Id).HasColumnName("Id");
    }
}