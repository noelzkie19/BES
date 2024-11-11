
using BES.Domain.Entities;
using BES.Domain.Common;

namespace BES.Domain.Events;
public class ConvertToJobEvent : DomainEvent
{
    public ConvertToJobEvent(ConvertToJobEventArgs args)
    {
        ConvertToJobEventArgs = args;
    }

    public ConvertToJobEventArgs ConvertToJobEventArgs { get; }

}

public class ConvertToJobEventArgs
{
    public int Id { get; set; }
    public int ClientId { get; set; }
    public string? Description { get; set; } = string.Empty;
    public int Quantity { get; set; }
    public int QuantityDelivered { get; set; }
    public string? OrderNumber { get; set; } 
    public string? DrawingNumber { get; set; } = string.Empty;
    public string? RevisionNumber { get; set; } = string.Empty;
    public string? NcrNumber { get; set; } = string.Empty;
    public DateTime? StartDate { get; set; }
    public DateTime? DueDate { get; set; }
    public DateTime? DeliveryDate { get; set; }
    public string? SetupText { get; set; } = string.Empty;
    public string? CompletedBy { get; set; } = string.Empty;
    public int JobTypeId { get; set; }

    public int? Number { get; set; }
    public int? QuoteNumberSource { get; set; }
    public DateTime? Date { get; set; }
    public int EstimatedHours { get; set; }
    public decimal? EstimatedCost { get; set; }
    public decimal MaterialCostVariable { get; set; }
    // public virtual Client Client { get; set; } = null!;
    public bool Delivered { get; set; }
    public string Status { get; private set;} = string.Empty;
    public bool Is30Days { get;  set; }
    public bool IsOverRuns { get;  set; }
    public bool IsCod { get;  set; }
    public int QtyAuthorisedOverruns { get;  set; }
}