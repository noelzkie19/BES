using BES.Application.Common.Mappings;
using BES.Domain.Entities;

namespace BES.Application.JobAggregate.Models
{
    public class JobVm 
    {
        public Job Job { get; set; }
        public Client Client { get; set; }
        public JobType JobType { get; set; }
        public Operation? Operations { get; set; }
        public JobNote? JobNote { get; set; }
        public string Status {get; set; }
        public Purchase? Purchase { get; set; }
        public PurchaseLine? PurchaseLine { get; set; }
        public Supplier? Supplier { get; set; }
        public UserAccount? UserAccount { get; set; }
        public string? CreatedByName { get; set; }
        public string DueDateString { get; set; } = string.Empty;
        public Quote Quote { get; set; }
        public Delivery Delivery { get; set; }
        public DeliveryLine DeliveryLine { get; set; }

        public int? StockQty { get; set; }
        public int? ExpandedItemCnt { get; set; }
    }
}

