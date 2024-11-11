using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BES.Application.Common.Mappings;
using BES.Domain.Entities;

namespace BES.Application.ResourceAggregate.Model
{
    public class ResourceDTO : IMapFrom<Resource>
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
        public decimal HourlyRate { get; set; }
        public bool IsActive { get; set; }
    }
}