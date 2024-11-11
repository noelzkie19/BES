using System;
using System.Collections.Generic;

namespace BES.Domain.Entities
{
    public class DeliveryLine
    {
        public int Id { get; set; }
        public long DeliveryLineNumber { get; private set; }
        public long DeliveryNumber { get; private set; }
        public int JobId { get; private set; }
        public int QuantitySent { get; private set; }
        public int DeliveryId { get; private set; }
        public int BalanceQuantity { get; set; }
        public virtual Delivery Delivery { get; private set; } = null!;
        public virtual Job Job { get; set; }

        public DeliveryLine() { }
        public DeliveryLine(int deliveryId, long deliveryLineNumber, long deliveryNumber, int jobId, int quantitySent, int balanceQuantity)
        {
            DeliveryId = deliveryId;
            DeliveryLineNumber = deliveryLineNumber;
            DeliveryNumber = deliveryNumber;
            JobId = jobId;
            QuantitySent = quantitySent;
            BalanceQuantity = balanceQuantity;
        }

        public void Update(int id, long deliveryLineNumber, long deliveryNumber, int jobNumber, int quantitySent)
        {
            Id = id;
            DeliveryLineNumber = deliveryLineNumber;
            DeliveryNumber = deliveryNumber;
            JobId = jobNumber;
            QuantitySent = quantitySent;
        }

    }
}
