using System;
using System.Collections.Generic;
using BES.Application.Common.Mappings;
using BES.Domain.Entities;

namespace BES.Application.PurchaseOrderAggregate.Models
{
    public class PurchaseReceiptDto : IMapFrom<PurchaseReceipt>
    {
        public long PurchaseLineNumber { get; set; }
        public DateTime? Date { get; set; }
        public int Quantity { get; set; }
        public string? Note { get; set; }
        public string HeatNumber { get; set; } = string.Empty;
        public bool ReceiptMyob { get; set; }
        public string PackingSlipNumber { get; set; } = string.Empty;
        public string LotNumber { get; set; } = string.Empty;
        public string GoodInspctReceivedBy { get; set; } = string.Empty;

    }
}




