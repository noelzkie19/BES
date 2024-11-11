using BES.Application.Common.Mappings;
using BES.Domain.Entities;

namespace BES.Application.PurchaseOrderAggregate.Models
{
    public class PurchaseJobVm 
    {
        public Job Job { get; set; }
        public Client Client { get; set; }
    }
}

