
using BES.Domain.Entities;
using BES.Domain.Common;

namespace BES.Domain.Events;
public class CopyJobEvent : DomainEvent
{
    public CopyJobEvent(CopyJobEventArgs args)
    {
        CopyJobEventArg = args;
    }

    public CopyJobEventArgs CopyJobEventArg { get; }

}

public class CopyJobEventArgs
{
    public string JobId { get; set; }
    public int? JobIdSource { get; set; }
    public long[]? CopyPurchasesId { get; set; }
}