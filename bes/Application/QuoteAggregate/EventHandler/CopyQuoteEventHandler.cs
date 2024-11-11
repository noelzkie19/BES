using BES.Application.Common.Exceptions;
using BES.Application.Common.Interfaces;
using BES.Application.Common.Models;
using BES.Domain.Events;
using MediatR;
using BES.Domain.Entities;

namespace BES.Application.QuoteAggregate.Events;

public class CopyQuoteEventHandler : INotificationHandler<DomainEventNotification<CopyQuoteEvent>>
{
    private readonly IApplicationDbContext _context;
    public CopyQuoteEventHandler(IApplicationDbContext context)
    {
        _context = context;
    }
    public async Task Handle(DomainEventNotification<CopyQuoteEvent> notification, CancellationToken cancellationToken)
    {
        try
        {
            var quoteNumberId = notification.DomainEvent.CopyQuoteEventArg.QuoteNumberId;
            var quoteNumber = notification.DomainEvent.CopyQuoteEventArg.QuoteNumber;
            var quote = _context.Quotes.FirstOrDefault(x => x.Number == quoteNumber);
            if (quote == null)
                throw new NotFoundException("Quote does not exists.");
            var lastSupplier = _context.Suppliers.OrderByDescending(a => a.Id)
                .Select(p => p).FirstOrDefault();
            var supplierId = lastSupplier == null ? 1 : lastSupplier.Id;
            var materials = _context.Materials.Where(x => x.QuoteNumber == quoteNumber).ToList();
            foreach (var material in materials)
            {
                var newMaterial = new Material(quoteNumber, "string", "1mm", supplierId, "1",
                    DateTime.Now, DateTime.Now, material.Name, material.Quantity, material.UnitPrice
                    , material.GST, material.TotalPrice);
                _context.Materials.Add(newMaterial);
            }
            // await _context.SaveChangesAsync(cancellationToken);
        }
        catch (Exception ex)
        {
            throw ex;
        }

    }
}