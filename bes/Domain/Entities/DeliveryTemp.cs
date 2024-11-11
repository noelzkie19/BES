using System;
using System.Collections.Generic;

namespace BES.Domain.Entities
{
    public class DeliveryTemp : AuditableEntity
    {
        public long JobNumber { get; set; }
        public bool Select { get; set; }
        public int QuantitySend { get; set; }
    }
}
