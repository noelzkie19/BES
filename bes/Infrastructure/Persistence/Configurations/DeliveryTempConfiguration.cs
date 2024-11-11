using BES.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BES.Infrastructure.Persistence.Configurations;

public class DeliveryTempConfigure : IEntityTypeConfiguration<DeliveryTemp>
{
    public void Configure(EntityTypeBuilder<DeliveryTemp> builder)
    {
        builder.Property(e => e.Id).HasColumnName("ID");
    }
}