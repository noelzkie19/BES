using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using AutoMapper;
using BES.Application.Common.Mappings;
using BES.Application.JobAggregate.Models;
using BES.Domain.Entities;

namespace BES.Application.JobAggregate.Model
{
    public class JobSubassemblyDto : IMapFrom<Job>
    {
        public int Id { get; set; }
        public long JobNumber { get; set; }
        public long? ParentJobNumber { get; set; }
        public string Description { get; set; } = null!;
        public int EstimatedHours { get; set; }
        public int Quantity { get; set; }
        public string DrawingNumber { get; set; } = null!;
        public string RevisionNumber { get; set; } = null!;
        public string OrderNumber { get; set; } = null!;
        public decimal SalePrice { get; set; }
        public decimal SalePerUnit { get; set; }
        public decimal TotalPrice { get; set; }
        public decimal MaterialCost { get; set; }
        public decimal LabourCost { get; set; }
        public decimal OtherCost { get; set; }
        public decimal TotalCost { get; set; }
    }
}