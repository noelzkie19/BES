
using BES.Domain.Entities;
using BES.Domain.Common;

namespace BES.Domain.Events;
public class DeliveryCreatedEvent : DomainEvent
{
    public DeliveryCreatedEvent(DeliveryCreatedEventArgs args)
    {
        DeliveryCreatedEventArg = args;
    }

    public DeliveryCreatedEventArgs DeliveryCreatedEventArg { get; }

}

public class DeliveryCreatedEventArgs
{
    public long deliveryNumber { get; set; }
}