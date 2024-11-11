using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using BES.Application.Common.Mappings;
using BES.Domain.Entities;

namespace BES.Application.JobAggregate.Model
{
    public class JobByClientDto : IMapFrom<Job>
    {
        public int Id { get; set; }
        public long JobNumber { get; set; }
        public long? ParentJobNumber { get; set; }
        public string Description { get; set; } = null!;
        public string JobId { get; set; }= null!;

    }
}