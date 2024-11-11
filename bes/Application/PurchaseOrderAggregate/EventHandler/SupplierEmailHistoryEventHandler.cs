using Application.Common.Interfaces;
using Application.Common.Models.Email;
using BES.Application.Common.Exceptions;
using BES.Application.Common.Interfaces;
using BES.Application.Common.Models;
using BES.Domain.Entities;
using BES.Domain.Events;
using MediatR;

public class SupplierEmailHistoryEventHandler : INotificationHandler<DomainEventNotification<SupplierEmailHistoryEvent>>
{
    private readonly IApplicationDbContext _context;
    public SupplierEmailHistoryEventHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task Handle(DomainEventNotification<SupplierEmailHistoryEvent> notification, CancellationToken cancellationToken)
    {

        var supplierEmailHistory = new SupplierEmailHistory(
            notification.DomainEvent.SupplierEmailHistoryEventArg.SupplierId,
            notification.DomainEvent.SupplierEmailHistoryEventArg.EmailDate,
            notification.DomainEvent.SupplierEmailHistoryEventArg.EmailType,
            notification.DomainEvent.SupplierEmailHistoryEventArg.ReferenceNumber,
            notification.DomainEvent.SupplierEmailHistoryEventArg.EmailedBy,
            notification.DomainEvent.SupplierEmailHistoryEventArg.FileStorageId,
            notification.DomainEvent.SupplierEmailHistoryEventArg.ContentBody
        );

        _context.SupplierEmailHistories.Add(supplierEmailHistory);

        await _context.SaveChangesAsync(cancellationToken);
    }
}