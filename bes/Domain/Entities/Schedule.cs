using BES.Domain.Common;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace BES.Domain.Entities
{
    public class Schedule : BaseEntity
    {
        public Schedule(bool isUrgent, int jobId, string? notes,int? assigneeId) 
        {
            IsUrgent = isUrgent;
            JobId = jobId;
            Notes = notes;
            AssigneeId = assigneeId;
        }

        public void setNotes(string? notes)
        {
            this.Notes = notes;
        }

        public void setUrgent(bool isUrgent)
        {
            this.IsUrgent = isUrgent;
        }


        public bool IsUrgent { get; private set; }
        public int JobId { get; private set; } = 0!;
        public string? Notes { get; private set; } = null!;
        public int? AssigneeId { get; private set; } = null!;
        
        [ForeignKey("AssigneeId")]
        public virtual UserAccount? UserAccount { get; set; }

        public virtual Job Job { get; private set; } = null!;
    }
}