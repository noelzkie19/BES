using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using AutoMapper;
using BES.Application.Common.Mappings;
using BES.Domain.Entities;

namespace BES.Application.StockAggregate.Model
{
    public class StockJobDto : IMapFrom<Stock>
    {
        public string? Drawing { get; set; } = null!;
        public string? Revision { get; set; } = null!;
        public int? Quantity { get; set; } = null!;
    }
}
