
using BES.Domain.Entities;
using BES.Domain.Common;

namespace BES.Domain.Events;
public class SupplierEmailHistoryEvent : DomainEvent
{
    public SupplierEmailHistoryEvent(SupplierEmailHistoryEventArgs args)
    {
        SupplierEmailHistoryEventArg = args;
    }

    public SupplierEmailHistoryEventArgs SupplierEmailHistoryEventArg { get; }

}

public class SupplierEmailHistoryEventArgs
{
    public int SupplierId { get; set; } 
    public DateTime EmailDate { get; set; }
    public string EmailType { get; set; } = null!;
    public string ReferenceNumber { get; set; } = null!;
    public string EmailedBy { get; set; } = null!;
    public int FileStorageId { get; set; }
    public string ContentBody { get; set; }
}

