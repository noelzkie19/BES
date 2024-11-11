
using BES.Application.Common.Mappings;
using BES.Domain.Entities;

namespace BES.Application.PurchaseOrderAggregate.Models
{

    public class PurchaseNCDto : IMapFrom<Purchase>
    {
        public int Id { get; set; }
        public string PurchaseNumber { get; set; }
    }
}
