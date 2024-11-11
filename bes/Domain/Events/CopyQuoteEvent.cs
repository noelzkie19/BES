
using BES.Domain.Entities;
using BES.Domain.Common;

namespace BES.Domain.Events;
public class CopyQuoteEvent : DomainEvent
{
    public CopyQuoteEvent(CopyQuoteEventArgs args)
    {
        CopyQuoteEventArg = args;
    }

    public CopyQuoteEventArgs CopyQuoteEventArg { get; }

}

public class CopyQuoteEventArgs
{
    public int QuoteNumber{ get; set; }
    public string QuoteNumberId { get; set; }
}