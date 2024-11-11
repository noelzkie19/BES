using BES.Application.Common.Mappings;
using BES.Domain.Entities;


namespace BES.Application.DeliveryAggregate.Model
{
    public class DeliveryLineDto : IMapFrom<Delivery>
    {
        public int Id { get; set; }
        public long DeliveryLineNumber { get; set; }
        public long DeliveryNumber { get; set; }
        public string JobId { get; set; }
        public int QuantitySent { get; set; }
        public bool IsDeleted { get; set; }        
    }
   
}