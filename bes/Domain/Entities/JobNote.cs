using System;
using System.Collections.Generic;

namespace BES.Domain.Entities
{
    public class JobNote : AuditableEntity
    {
        public JobNote() {

        }
        public JobNote(int jobId, string note, DateTime? date)
        {
            JobId = jobId;
            Note = note;
            Date = date;

        }

        public void Update(string note, DateTime? date)
        {
           Note = note;
           Date = date;
        }

        public int JobId { get; private set; }
        public string Note { get; private set; }
        public DateTime? Date { get; private set; }
        public virtual Job Job { get; private set; } = null!;
        // public virtual Quote Quote { get; private set; } = null!;
    }
}
