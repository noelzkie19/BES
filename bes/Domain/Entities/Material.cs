using System;
using System.Collections.Generic;

namespace BES.Domain.Entities
{
    public class Material : AuditableEntity
    {
        public Material (int quoteNumber,string description, string size, int supplierId, string numberOrdered,
            DateTime orderDate, DateTime deliveryDate
            ,string name, int quantity, decimal unitPrice,bool gST,decimal totalPrice) {
            QuoteNumber = quoteNumber;
            Description = description;
            Size = size;
            SupplierId = supplierId;
            NumberOrdered = numberOrdered;
            OrderDate = orderDate;
            DeliveryDate = deliveryDate;
            Name = name;
            Quantity = quantity;
            UnitPrice = unitPrice;
            GST = gST;
            TotalPrice = totalPrice;
        }
        public void Update (int quoteNumber,string description, string size, int supplierId, string numberOrdered,
            DateTime orderDate, DateTime deliveryDate
            ,string name, int quantity, decimal unitPrice,bool gST,decimal totalPrice) {
            QuoteNumber = quoteNumber;
            Description = description;
            Size = size;
            SupplierId = supplierId;
            NumberOrdered = numberOrdered;
            OrderDate = orderDate;
            DeliveryDate = deliveryDate;
            Name = name;
            Quantity = quantity;
            UnitPrice = unitPrice;
            GST = gST;
            TotalPrice = totalPrice;
        }
        public string Description { get; set; } = null!;
        public string? Name { get; set; } = null!;
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public bool GST { get; set; }
        public decimal TotalPrice { get; set; }
        public string Size { get; set; } = null!;
        public int? JobId { get; set; }
        public int SupplierId { get; set; }
        public string NumberOrdered { get; set; } = null!;
        public DateTime OrderDate { get; set; }
        public DateTime DeliveryDate { get; set; }
        public int QuoteNumber { get; set; }

        public virtual Job? Job { get; set; } = null!;
        public virtual Supplier Supplier { get; set; } = null!;
        public virtual Quote Quote { get; set; } = null!;
    }
}
