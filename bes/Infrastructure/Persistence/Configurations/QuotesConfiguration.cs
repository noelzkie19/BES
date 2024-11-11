using BES.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BES.Infrastructure.Persistence.Configurations;

public class QuotesConfiguration : IEntityTypeConfiguration<Quote>
{
    public void Configure(EntityTypeBuilder<Quote> builder)
    {
        builder.Property(e => e.Id).HasColumnName("ID");
        builder.Property(e => e.ClientId).HasColumnName("ClientID");
        // builder.Property(e => e.Date).HasColumnType("datetime");
        // builder.Property(e => e.EstimatedCost).HasColumnType("money");
        // builder.Property(e => e.CostPerItem).HasColumnType("money");
        // builder.Property(e => e.TotalCost).HasColumnType("money");
        
        // builder.Property(e => e.JobId).HasColumnName("JobID");

        builder.HasOne(d => d.Client)
            .WithMany(p => p.Quotes)
            .HasForeignKey(d => d.ClientId)
            .OnDelete(DeleteBehavior.ClientSetNull)
            .HasConstraintName("FK_Quote_Client");
        

        // builder.HasOne(d => d.Job)
        //     .WithMany(p => p.Quotes)
        //     .HasForeignKey(d => d.JobId)
        //     .OnDelete(DeleteBehavior.ClientSetNull)
        //     .HasConstraintName("FK_Quote_Job");
    }
}