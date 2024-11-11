using BES.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BES.Infrastructure.Persistence.Configurations;

public class DateCriterionConfiguration : IEntityTypeConfiguration<DateCriterion>
{
    public void Configure(EntityTypeBuilder<DateCriterion> builder)
    {
        builder.Property(e => e.Id).HasColumnName("ID");
        builder.Property(e => e.DateCriteria).HasMaxLength(50);
    }
}