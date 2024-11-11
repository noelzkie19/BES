using System;
using System.Collections.Generic;

namespace BES.Domain.Entities
{
    public class PurchaseLine : AuditableEntity
    {

        public PurchaseLine()
        {
            PurchaseReceipts = new HashSet<PurchaseReceipt>();
        }

        public PurchaseLine(long purchaseLineNumber, string purchaseNumber, int quantity, int quantityReceived, bool received, string description, DateTime? dueDate, decimal costEach, decimal costTotal,
          int? jobId, string accountNumber, bool isIncludeGST, bool isMaterialCertRequired, string invoiceNumber, bool isInternal, decimal gstAmount)
        {
            PurchaseLineNumber = purchaseLineNumber;
            PurchaseNumber = purchaseNumber;
            Quantity = quantity;
            QuantityReceived = quantityReceived;
            Received = received;
            Description = description;
            DueDate = dueDate;
            CostEach = costEach;
            CostTotal = costTotal;
            JobId = jobId;
            AccountNumber = accountNumber;
            IsIncludeGST = isIncludeGST;
            IsMaterialCertRequired = isMaterialCertRequired;
            InvoiceNumber = invoiceNumber;
            Internal = isInternal;
            GstAmount = gstAmount;
            PurchaseReceipts = new HashSet<PurchaseReceipt>();
        }

        public void update(long purchaseNumber, int quantity, int quantityReceived, bool received, string description, DateTime? dueDate, decimal costEach, decimal costTotal,
         int? jobId, string accountNumber, bool isIncludeGST, bool isMaterialCertRequired, string invoiceNumber, bool isInternal, decimal gstAmount)
        {
            Quantity = quantity;
            QuantityReceived = quantityReceived;
            Received = received;
            Description = description;
            DueDate = dueDate;
            CostEach = costEach;
            CostTotal = costTotal;
            JobId = jobId;
            AccountNumber = accountNumber;
            IsIncludeGST = isIncludeGST;
            IsMaterialCertRequired = isMaterialCertRequired;
            InvoiceNumber = invoiceNumber;
            Internal = isInternal;
            GstAmount = gstAmount;
        }

        public void updateJobDetails(string description, DateTime? dueDate, int quantity, decimal costEach, decimal totalCost)
        {
            Quantity = quantity;
            Description = description;
            DueDate = dueDate;
            CostEach = costEach;
            CostTotal = totalCost;
        }


        public void setJobId(int jobId) {
            JobId = jobId;
        }

        public long PurchaseLineNumber { get; private set; }
        public string PurchaseNumber { get; private set; }
        public int Quantity { get; private set; }
        public int QuantityReceived { get; private set; }
        public bool Received { get; set; }
        public string Description { get; private set; } = null!;
        public DateTime? DueDate { get; private set; }
        public decimal CostEach { get; private set; }
        public decimal CostTotal { get; private set; }
        public int? JobId { get; private set; }
        public string AccountNumber { get; private set; } = null!;
        public bool IsIncludeGST { get; private set; }
        public bool IsMaterialCertRequired { get; private set; }
        public string InvoiceNumber { get; private set; }
        public bool Internal { get; private set; }
        public decimal GstAmount { get; private set; }
        public virtual Purchase Purchase { get; private set; } = null!;
        public virtual ICollection<PurchaseReceipt> PurchaseReceipts { get; set; }
        public virtual Job? Job { get; set; }
        
    }
}