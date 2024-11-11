using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using BES.Application.Common.Mappings;
using BES.Domain.Entities;

namespace BES.Application.SupplierAggregate.Model
{
    public class SupplierApprovalDto : IMapFrom<SupplierApproval>
    {
        public int SupplierId { get; set; }
        public DateTime? InitialDate { get; set; } = null!;
        public bool InitialApproved { get; set; }
        public bool InitialCritical { get; set; }
        public int? InitialApprovedBy { get; set; }
        public DateTime? LastDate { get; set; } = null!;
        public bool LastApproved { get; set; }
        public bool LastCritical { get; set; }
        public int? LastApprovedBy { get; set; }
        public DateTime? NextDate { get; set; } = null!;
        public string? InitialDateString { get; set; }
        public string? LastDateString { get; set; }
        public string? NextDateString { get; set; } 
    }
}
