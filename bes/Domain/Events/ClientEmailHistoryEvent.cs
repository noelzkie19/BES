using BES.Domain.Entities;
using BES.Domain.Common;

namespace BES.Domain.Events;

public class ClientEmailHistoryEvent : DomainEvent
{
    public ClientEmailHistoryEvent(ClientEmailHistoryEventArgs args) 
    {
        ClientEmailHistoryEventArg = args;
    }
    public ClientEmailHistoryEventArgs ClientEmailHistoryEventArg { get; }
}
public class ClientEmailHistoryEventArgs 
{
    public int ClientId { get; set; } 
    public DateTime EmailDate { get; set; }
    public string EmailType { get; set; } = null!;
    public string ReferenceNumber { get; set; } = null!;
    public string EmailedBy { get; set; } = null!;
    public int FileStorageId { get; set; }
}
