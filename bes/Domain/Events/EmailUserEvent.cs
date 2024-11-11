
using BES.Domain.Entities;
using BES.Domain.Common;

namespace BES.Domain.Events;
public class EmailUserEvent : DomainEvent
{
    public EmailUserEvent(EmailUserEventArgs args)
    {
        EmailUserEventArg = args;
    }

    public EmailUserEventArgs EmailUserEventArg { get; }

}

public class EmailUserEventArgs
{
    public string Email { get; set; } = null!;
    public string InitialPassword { get; set; } = null!;
    
}

