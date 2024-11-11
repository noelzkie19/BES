using Application.Common.Interfaces;
using Application.Common.Models.Email;
using BES.Application.Common.Exceptions;
using BES.Application.Common.Interfaces;
using BES.Application.Common.Models;
using BES.Domain.Entities;
using BES.Domain.Events;
using MediatR;

public class ClientEmailHistoryEventHandler : INotificationHandler<DomainEventNotification<ClientEmailHistoryEvent>>
{
    private readonly IApplicationDbContext _context;
    public ClientEmailHistoryEventHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task Handle(DomainEventNotification<ClientEmailHistoryEvent> notification, CancellationToken cancellationToken)
    {
        var clientEmailHistory = new ClientEmailHistory(
            notification.DomainEvent.ClientEmailHistoryEventArg.ClientId,
            notification.DomainEvent.ClientEmailHistoryEventArg.EmailDate,
            notification.DomainEvent.ClientEmailHistoryEventArg.EmailType,
            notification.DomainEvent.ClientEmailHistoryEventArg.ReferenceNumber,
            notification.DomainEvent.ClientEmailHistoryEventArg.EmailedBy,
            notification.DomainEvent.ClientEmailHistoryEventArg.FileStorageId);

        _context.ClientEmailHistories.Add(clientEmailHistory);

        await _context.SaveChangesAsync(cancellationToken);
    }
}