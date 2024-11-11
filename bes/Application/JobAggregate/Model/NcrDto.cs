using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using BES.Application.Common.Mappings;
using BES.Domain.Entities;

namespace BES.Application.JobAggregate.Model
{
    public class NcrDto : IMapFrom<NonConformance>
    {
        public int? Id { get; set; }
        public string NcrNumber { get; set; } = null!;
       
    }
}
