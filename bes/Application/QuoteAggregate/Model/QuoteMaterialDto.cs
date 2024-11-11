using BES.Application.Common.Mappings;
using BES.Domain.Entities;
using AutoMapper;

namespace BES.Application.QuoteAggregate.Model
{
    public class QuoteMaterialDto : IMapFrom<Material>
    {
        public int Id { get; set; }
        public string Description { get; set; } = null!;
        public int JobId { get; set; }
        public string Size { get; set; } = null!;
        public int SupplierId { get; set; }
        public string? NumberOrdered { get; set; } = null!;
        public DateTime OrderDate { get; set; }
        public DateTime DeliveryDate { get; set; }
        public int QuoteNumber { get; set; }
        public string? Name { get; set; } = null!;
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public bool GST { get; set; }
        public decimal TotalPrice { get; set; }
        public bool IsDeleted { get; set; }

    }
}