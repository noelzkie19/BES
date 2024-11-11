using System;
using System.Collections.Generic;

namespace BES.Domain.Entities
{
    public class JobType : AuditableEntity
    {
        public JobType()
        {
            Jobs = new HashSet<Job>();
        }
        public JobType(string description)
        {

            Description = description;
            Jobs = new HashSet<Job>();
        }

        public string Description { get; set; } = null!;

        public virtual ICollection<Job> Jobs { get; set; }
     }
}
