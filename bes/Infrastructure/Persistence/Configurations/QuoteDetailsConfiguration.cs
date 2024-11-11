using BES.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BES.Infrastructure.Persistence.Configurations;

public class QuoteDetailsConfiguration : IEntityTypeConfiguration<QuoteDetail>
{
    public void Configure(EntityTypeBuilder<QuoteDetail> builder)
    {
        builder.Property(e => e.Id).HasColumnName("ID");

        builder.HasOne(d => d.Quote)
            .WithMany(p => p.QuoteDetails)
            .HasForeignKey(d => d.QuoteId)
            .OnDelete(DeleteBehavior.ClientSetNull)
            .HasConstraintName("FK_Quote_Id");
    }
}