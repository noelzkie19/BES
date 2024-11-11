using System;
using System.Collections.Generic;

namespace BES.Domain.Entities
{
    public class Stock : AuditableEntity
    {
        public string Drawing { get; set; } = string.Empty;
        public string Revision { get; set; } = string.Empty;
        public int Quantity { get; set; } = 0!;
        public int JobId { get; set; } = 0!;
        public string Notes { get; set; } = null!;
        public string Description { get; set; } = null!;
        public virtual Job Job { get; set; } = null!;
        public Stock() {}

        public Stock(string drawing, string revision, int quantity,int jobId, string notes, string description)
        {
            Drawing = drawing;
            Revision = revision;
            Quantity = quantity;
            JobId = jobId;
            Notes = notes;
            Description = description;
        }
        public void Update(string drawing, string revision, int quantity, string notes, string description,int jobId)
        {
            Drawing = drawing;
            Revision = revision;
            Quantity = quantity;
            Notes = notes;
            Description = description;
            JobId = jobId;
        }
    }
}
