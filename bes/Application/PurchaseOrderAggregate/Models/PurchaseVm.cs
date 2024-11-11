using BES.Application.Common.Mappings;
using BES.Domain.Entities;

namespace BES.Application.PurchaseOrderAggregate.Models
{
    public class PurchaseVm 
    {
        public Purchase Purchase { get; set; }
        public PurchaseLine PurchaseLine { get; set; }
        public Supplier? Supplier { get; set; }
        public SupplierAddress? SupplierAddress { get; set; }
        public string? ConcatSupplierAddress { get; set; }
        public bool IsDeleted { get; set; }
        public string? ClientName { get; set; } = null!;
        public string? DisplayJobId { get; set; } = null!;
        public string? JobDescription { get; set; } = null!;
        public string? FirstName { get; set; } = null!;
        public string? LastName { get; set; } = null!;
        public bool IsCompleted { get; set; }
        public int QuantityDelivered { get; set; }
    }
}

