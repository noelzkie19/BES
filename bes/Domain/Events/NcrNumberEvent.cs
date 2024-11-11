namespace BES.Domain.Events;

public class NcrNumberEvent : DomainEvent
{
    public NcrNumberEvent(NcrNumberEventArgs args)
    {
        IsPublished = false;
        NcrNumberEventArgs = args;
    }

    public NcrNumberEventArgs NcrNumberEventArgs { get; }

}

public class NcrNumberEventArgs
{
    public long NcrNumber { get; set; }
}

