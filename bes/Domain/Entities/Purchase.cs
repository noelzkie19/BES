using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace BES.Domain.Entities
{
    public class Purchase : AuditableEntity , IHasDomainEvent
    {

        public Purchase(string lastPurchaseNumber)
        {
            PurchaseLines = new HashSet<PurchaseLine>();
        }


        public Purchase(string purchaseNumber, int supplierId, DateTime? date, bool printed, DateTime? printedDate, decimal freightCost, string? notes, bool exportMyob, string internalNotes,
           string invoiceText, string poNotes, bool isCourPlsReceivePays, bool isBesArrCollection, bool isCallReady, bool isCallReadyQuoting, bool isOthers, string otherNotes,
           bool isApproved)
        {
            PurchaseNumber = purchaseNumber;
            SupplierId = supplierId;
            Date = date;
            Printed = printed;
            PrintedDate = printedDate;
            FreightCost = freightCost;
            Notes = notes;
            ExportMyob = exportMyob;
            InternalNotes = internalNotes;
            InvoiceText = invoiceText;
            PoNotes = poNotes;
            IsCourPlsReceivePays = isCourPlsReceivePays;
            IsBesArrCollection = isBesArrCollection;
            IsCallReady = isCallReady;
            IsCallReadyQuoting = isCallReadyQuoting;
            IsOthers = isOthers;
            OtherNotes = otherNotes;
            IsApproved = isApproved;
            PurchaseLines = new HashSet<PurchaseLine>();
        }

        public void Update(int supplierId, DateTime? date, bool printed, DateTime? printedDate, decimal freightCost, string? notes, bool exportMyob, 
           string internalNotes, string invoiceText, string poNotes, bool isCourPlsReceivePays, bool isBesArrCollection, bool isCallReady, bool isCallReadyQuoting, bool isOthers, string otherNotes,
           bool isApproved)
        {

            SupplierId = supplierId;
            Date = date;
            Printed = printed;
            PrintedDate = printedDate;
            FreightCost = freightCost;
            Notes = notes;
            ExportMyob = exportMyob;
            InternalNotes = internalNotes;
            InvoiceText = invoiceText;
            PoNotes = poNotes;
            IsCourPlsReceivePays = isCourPlsReceivePays;
            IsBesArrCollection = isBesArrCollection;
            IsCallReady = isCallReady;
            IsCallReadyQuoting = isCallReadyQuoting;
            IsOthers = isOthers;
            OtherNotes = otherNotes;
            IsApproved = isApproved;
        }


        public void UpdatePrintedDate(DateTime printedDate) 
        {
            Printed = true;
            PrintedDate = printedDate;
        }

        public string PurchaseNumber { get; private set; }
        public int SupplierId { get; private set; }
        public DateTime? Date { get; private set; }
        public bool Printed { get; private set; }
        public DateTime? PrintedDate { get; private set; }
        public decimal FreightCost { get; private set; }
        public string? Notes { get; private set; }
        public bool ExportMyob { get; private set; }
        public string InternalNotes { get; private set; } = null!;
        public string InvoiceText { get; private set; } = null!;
        public string PoNotes { get; private set; } = null!;
        public bool IsCourPlsReceivePays { get; private set; }
        public bool IsBesArrCollection { get; private set; }
        public bool IsCallReady { get; private set; }
        public bool IsCallReadyQuoting { get; private set; }
        public bool IsOthers { get; private set; }
        public string OtherNotes { get; private set; } = null!;
        public bool IsApproved { get; private set; }
        public virtual ICollection<PurchaseLine> PurchaseLines { get; set; }
        public virtual Supplier? Supplier { get; set; }

        [NotMapped]
        public List<DomainEvent> DomainEvents { get; set; } = new List<DomainEvent>();
    }
}
