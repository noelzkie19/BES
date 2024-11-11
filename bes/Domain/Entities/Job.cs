using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace BES.Domain.Entities
{
    public class Job : AuditableEntity, IHasDomainEvent
    {   
        public Job() {}
        public Job(long jobNumber, string description, DateTime? startDate, DateTime? dueDate, int estimatedHours, int quantity
            ,string drawingNumber, string revisionNumber, int clientId, string orderNumber, bool delivered, int quantityDelivered, decimal salePrice
            ,int jobTypeId, string notes, int heatNumber, int materialMarkup, int labourMarkup, string setupText, string jobId
            ,string ncrNumber, string completedBy, bool isQoutedJob, bool isByHour, decimal salePerUnit, decimal salesPrice, decimal deliveryCharge
            ,decimal totalPrice, decimal materialCost, decimal labourCost, decimal otherCost, decimal totalCost, bool toBeInvoiced
            ,string? invoiceNumber, DateTime? deliveryDate, int? quoteNumberSource, decimal materialCostVariable
            ,bool isOverRuns, bool is30Days, bool isCod, int qtyAuthorisedOverruns, decimal labourCostRate)
        {

            JobNumber = jobNumber;
            Description = description;
            StartDate = startDate;
            DueDate = dueDate;
            EstimatedHours = estimatedHours;
            Quantity = quantity;
            DrawingNumber = drawingNumber;
            RevisionNumber = revisionNumber;
            ClientId = clientId;
            OrderNumber = orderNumber;
            QuantityDelivered = quantityDelivered;
            SalePrice = salePrice;
            JobTypeId = jobTypeId;
            Notes = notes;
            HeatNumber = heatNumber;
            MaterialMarkup = materialMarkup;
            LabourMarkup = labourMarkup;
            SetupText = setupText;
            JobId = jobId;
            NcrNumber = ncrNumber;
            CompletedBy = completedBy;
            IsQoutedJob = isQoutedJob;
            IsByHour = isByHour;
            DeliveryDate = deliveryDate;
            QuoteNumberSource = quoteNumberSource;
            MaterialCostVariable = materialCostVariable;
            IsOverruns = isOverRuns; 
            Is30Days = is30Days;
            IsCod = isCod; 
            QtyAuthorisedOverruns = qtyAuthorisedOverruns;
            LabourCostRate = labourCostRate;
            Materials = new HashSet<Material>();
            Operations = new HashSet<Operation>();
            DeliveryLines = new HashSet<DeliveryLine>();
            Stocks = new HashSet<Stock>();
            JobNotes = new HashSet<JobNote>();
    
        }

        public void Update(string description, DateTime? startDate, DateTime? dueDate, int estimatedHours, int quantity
            ,string drawingNumber, string revisionNumber, int clientId, string orderNumber, bool delivered, int quantityDelivered, decimal salePrice
            ,int jobTypeId, string notes, int heatNumber, int materialMarkup, int labourMarkup, string setupText
            ,string ncrNumber, string completedBy, bool isQoutedJob, bool isByHour, decimal salePerUnit, decimal salesPrice, decimal deliveryCharge
            ,decimal totalPrice, decimal materialCost, decimal labourCost, decimal otherCost, decimal totalCost, bool toBeInvoiced
            ,string? invoiceNumber, DateTime? deliveryDate, decimal materialCostVariable, DateTime? jobDatePrinted
            ,bool isOverRuns, bool is30Days, bool isCod, int qtyAuthorisedOverruns, decimal labourCostRate)
        {
            Description = description;
            StartDate = startDate;
            DueDate = dueDate;
            EstimatedHours = estimatedHours;
            Quantity = quantity;
            DrawingNumber = drawingNumber;
            RevisionNumber = revisionNumber;
            ClientId = clientId;
            OrderNumber = orderNumber;
            QuantityDelivered = quantityDelivered;
            SalePrice = salePrice;
            JobTypeId = jobTypeId;
            Notes = notes;
            HeatNumber = heatNumber;
            MaterialMarkup = materialMarkup;
            LabourMarkup = labourMarkup;
            SetupText = setupText;
            NcrNumber = ncrNumber;
            CompletedBy = completedBy;
            IsQoutedJob = isQoutedJob;
            IsByHour = isByHour;
            SalePerUnit = salePerUnit;
            SalesPrice = salesPrice;
            DeliveryCharge = deliveryCharge;
            TotalPrice = totalPrice;
            MaterialCost = materialCost;
            LabourCost = labourCost;
            OtherCost = otherCost;
            TotalCost = totalCost;
            ToBeInvoiced = toBeInvoiced;
            InvoiceNumber = invoiceNumber;
            DeliveryDate = deliveryDate;
            MaterialCostVariable = materialCostVariable;
            JobDatePrinted = jobDatePrinted;
            IsOverruns = isOverRuns; 
            Is30Days = is30Days;
            IsCod = isCod; 
            QtyAuthorisedOverruns = qtyAuthorisedOverruns;
            LabourCostRate = labourCostRate;
            
        }

        public void SetSchedule(DateTime? dateScheduled) {
            DateScheduled = dateScheduled;
        }

        public void SetSubAssembly(string jobId, int id) {
            this.Quantity = 0;
            this.Delivered = false;
            this.QuantityDelivered = 0;
            this.OrderNumber = "0";
            this.EstimatedHours = 0;
            this.SalePrice = 0;
            this.JobId = jobId;
            this.ParentJobNumber = id;
            this.Id = 0;
        }

        public void UpdateDeliveryQuantity(int sentQuantity, bool delivered) {
            QuantityDelivered = sentQuantity;
            Delivered = delivered;
            DeliveryDate = DateTime.Now;
        }

        public void UpdateIsDuplicate(){
            IsDuplicate = true;
        }

        public void UpdateJobCardPrinted(){
            JobCardPrinted = DateTime.UtcNow;
            JobDatePrinted = DateTime.UtcNow;
        }

        public long JobNumber { get; private set; }
        public string Description { get; private set; } = null!;
        public long? ParentJobNumber { get; private set; }
        public DateTime? StartDate { get; private set; }
        public DateTime? DueDate { get; private set; }
        public int EstimatedHours { get; private set; }
        public int Quantity { get; private set; }
        public string DrawingNumber { get; private set; }
        public string RevisionNumber { get; private set; }
        public int ClientId { get; private set; }
        public string OrderNumber { get; private set; }
        public bool Delivered { get; private set; }
        public int QuantityDelivered { get; private set; }
        public decimal SalePrice { get; private set; }
        public int JobTypeId { get; private set; }
        public string? Notes { get; private set; }
        public int HeatNumber { get; private set; }
        public int MaterialMarkup { get; private set; }
        public int LabourMarkup { get; private set; }
        public string? SetupText { get; private set; }
        public DateTime? JobCardPrinted { get; private set; }
        public string JobId { get; private set; }= null!;
        public string NcrNumber { get; private set; } = null!;
        public bool IsQoutedJob { get; private set; }
        public bool IsByHour { get; private set; }
        public DateTime? DeliveryDate { get; private set; }
        public string CompletedBy { get; private set;} = null!;
        public int? QuoteNumberSource { get; set; }
        public virtual Client Client { get; private set; } = null!;
        public virtual JobType JobType { get; private set; } = null!;
        public DateTime? DateScheduled { get; private set; }
        public decimal SalePerUnit { get; private set; }
        public decimal SalesPrice { get; private set; }
        public decimal DeliveryCharge { get; private set; }
        public decimal TotalPrice { get; private set; }
        public decimal MaterialCost { get; private set; }
        public decimal LabourCost { get; private set; }
        public decimal LabourCostRate { get; private set; }
        public decimal OtherCost { get; private set; }
        public decimal TotalCost { get; private set; }
        public bool ToBeInvoiced { get; private set; }
        public string? InvoiceNumber { get; private set; }
        public decimal MaterialCostVariable { get; private set; }
        public DateTime? JobDatePrinted { get; private set; }
        public bool Is30Days { get; private set; }
        public bool IsOverruns { get; private set; }
        public bool IsCod { get; private set; }
        public int QtyAuthorisedOverruns { get; private set; }
        public bool IsDuplicate { get; private set; }
        public virtual Schedule Schedule { get; private set; } = null!;
        [ForeignKey("QuoteNumberSource")]
        public virtual Quote? Quote { get; private set; } = null!;

        public virtual ICollection<DeliveryLine> DeliveryLines { get; set; } = null!;
        public virtual ICollection<Material> Materials { get; private set; }
        public virtual ICollection<Operation> Operations { get; private set; }
        // public virtual ICollection<Quote> Quotes { get; private set; }
        public virtual ICollection<Stock> Stocks { get; private set; }
        public virtual ICollection<PurchaseLine> PurchaseLines { get; set; }
        public virtual ICollection<JobNote> JobNotes { get; private set; }

        [NotMapped]
        public List<DomainEvent> DomainEvents { get; set; } = new List<DomainEvent>();

        // public virtual ICollection<OperationResource> OperationResources { get; private set; }
    }
}