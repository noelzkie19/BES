using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using BES.Application.Common.Mappings;
using BES.Domain.Entities;

namespace BES.Application.StockAggregate.Model
{
    public class JobTypeDto : IMapFrom<JobType>
    {
        public int Id { get; set; }
        public string Description { get; set; } = null!;

    }
}
