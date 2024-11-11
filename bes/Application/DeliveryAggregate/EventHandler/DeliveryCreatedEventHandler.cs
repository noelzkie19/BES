using BES.Application.Common.Exceptions;
using BES.Application.Common.Interfaces;
using BES.Application.Common.Models;
using BES.Domain.Events;
using MediatR;

public class DeliveryCreatedEventHandler : INotificationHandler<DomainEventNotification<DeliveryCreatedEvent>>
{
    private readonly IApplicationDbContext _context;
    public DeliveryCreatedEventHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task Handle(DomainEventNotification<DeliveryCreatedEvent> notification, CancellationToken cancellationToken)
    {
        try
        {
            var deliveryId = notification.DomainEvent.DeliveryCreatedEventArg.deliveryNumber;
            var delivery = _context.Deliveries.FirstOrDefault(x => x.DeliveryNumber == deliveryId);

            if (delivery == null)
                throw new NotFoundException("Delivery does not exists.");

            var jobs = delivery.DeliveryLines.GroupBy(x => x.JobId).ToArray();

            foreach (var job in jobs) 
            {
                var updateJob = _context.Jobs.FirstOrDefault(x => x.Id == job.Key);
            
                if (updateJob != null)
                {
                    var newSent = _context.DeliveryLines.Where(x => x.JobId == updateJob.Id).Sum(x => (x.QuantitySent));
                    var isDelivered = updateJob.Quantity <= newSent;
                    updateJob.UpdateDeliveryQuantity(newSent, isDelivered);
                    _context.Jobs.Update(updateJob);
                }
            }

            await _context.SaveChangesAsync(cancellationToken);
        } 
        catch (Exception ex)
        {

        }
    }
}