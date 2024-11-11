using System;
using System.Collections.Generic;

namespace BES.Domain.Entities
{
    public class PurchaseReceipt : AuditableEntity
    {
        public long PurchaseLineNumber { get; private set; }
        public DateTime? Date { get; private set; }
        public int Quantity { get; private set; }
        public string? Note { get; private set; }
        public string HeatNumber { get; private set; } = string.Empty;
        public bool ReceiptMyob { get; private set; }

        public string PackingSlipNumber { get; private set; } = string.Empty;
        public string LotNumber { get; private set; } = string.Empty;
        public string GoodInspctReceivedBy { get; private set; } = string.Empty;

        public virtual PurchaseLine PurchaseLine { get; set; } = null!;
        
        public PurchaseReceipt(long purchaseLineNumber, DateTime? date, int quantity, string? note,
            string heatNumber, bool receiptMyob, string packingSlipNumber, string lotNumber, string goodInspctReceivedBy) {
            PurchaseLineNumber = purchaseLineNumber;
            Quantity = quantity;
            Date = date;
            Note = note;
            HeatNumber = heatNumber;
            ReceiptMyob = receiptMyob;
            PackingSlipNumber = packingSlipNumber;
            LotNumber = lotNumber;
            GoodInspctReceivedBy = goodInspctReceivedBy;
        }
    }
}
