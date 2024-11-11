using BES.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BES.Infrastructure.Persistence.Configurations;

public class JobConfiguration : IEntityTypeConfiguration<Job>
{
    public void Configure(EntityTypeBuilder<Job> builder)
    {
        builder.Property(e => e.Id).HasColumnName("ID");
        builder.Property(e => e.ClientId).HasColumnName("ClientID");
        builder.Property(e => e.CreatedBy).HasMaxLength(50);
        builder.Property(e => e.DueDate).HasColumnType("datetime");
        builder.Property(e => e.JobTypeId).HasColumnName("JobTypeID");
        builder.Property(e => e.SalePrice).HasColumnType("money");
        builder.Property(e => e.StartDate).HasColumnType("datetime");

        builder.HasOne(d => d.Client)
            .WithMany(p => p.Jobs)
            .HasForeignKey(d => d.ClientId)
            .OnDelete(DeleteBehavior.ClientSetNull)
            .HasConstraintName("FK_Job_Client");
   
        builder.HasOne(d => d.JobType)
            .WithMany(p => p.Jobs)
            .HasForeignKey(d => d.JobTypeId)
            .OnDelete(DeleteBehavior.ClientSetNull)
            .HasConstraintName("FK_Job_JobType");
    }
}