using BES.Application.Common.Mappings;
using BES.Domain.Entities;
using AutoMapper;

namespace BES.Application.QuoteAggregate.Model
{
    public class QuoteDetailDto : IMapFrom<QuoteDetail>
    {
        public int Id { get; set; }
        public int QuoteId { get; set; }
        public string Description { get; set; } = null!;
        public string Drawing { get; set; } = string.Empty;
        public string Revision { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public decimal CostPerUnit { get; set; }
        public decimal TotalCost { get; set; }
        public string EstLeadTime { get; set;} = string.Empty;        
        public bool IsDeleted { get; set; }
    }
}
