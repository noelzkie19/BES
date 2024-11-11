using BES.Application.Common.Exceptions;
using BES.Application.Common.Interfaces;
using BES.Application.Common.Models;
using BES.Domain.Events;
using MediatR;
using BES.Domain.Entities;
using BES.Application.JobAggregate.Queries.GetLastJobNumber;
using BES.Application.PurchaseOrderAggregate.Queries.GetAvailableJob;

namespace BES.Application.JobAggregate.events;

public class CopyJobEventHandler : INotificationHandler<DomainEventNotification<CopyJobEvent>>
{
    private readonly IApplicationDbContext _context;
     private readonly IMediator _mediator;
    public CopyJobEventHandler(IApplicationDbContext context, IMediator mediator)
    {
        _context = context;
        _mediator = mediator;
    }

    public async Task Handle(DomainEventNotification<CopyJobEvent> notification, CancellationToken cancellationToken)
    {
        try 
        {
            var jobId = notification.DomainEvent.CopyJobEventArg.JobId;
            var JobIdSource = notification.DomainEvent.CopyJobEventArg.JobIdSource;
            var CopyPurchasesId = notification.DomainEvent.CopyJobEventArg.CopyPurchasesId;

            var job = _context.Jobs.FirstOrDefault(x => x.JobId == jobId);
            

            var lastPOLine = _context.PurchaseLines.OrderByDescending(x => x.PurchaseLineNumber).FirstOrDefault();
            var lastPoLineId = lastPOLine == null ? 1 : lastPOLine.PurchaseLineNumber + 1;

            if (job == null)
                throw new NotFoundException("Job does not exists.");

            if (CopyPurchasesId != null) 
            {
                
                foreach (var poId in CopyPurchasesId) 
                {
                    var lastPurchaseNumber= await _mediator.Send(new GetLastPoNumber());
                    var line = _context.PurchaseLines.FirstOrDefault(x => x.PurchaseLineNumber == poId);
                    var hdr = _context.Purchases.FirstOrDefault(x => x.PurchaseNumber == line.PurchaseNumber);

                    var purchase = new Purchase(lastPurchaseNumber, hdr.SupplierId, DateTime.UtcNow, false, null, 0, "", false, "",
                    "", "", false, false, false, false, false, "", false);
                    
                     _context.Purchases.Add(purchase);

                    if (line == null) return;
                    
                    _context.PurchaseLines.Add(new PurchaseLine(lastPoLineId, lastPurchaseNumber, line.Quantity, line.QuantityReceived, line.Received, line.Description, line.DueDate,
                    line.CostEach, line.CostTotal, job.Id, line.AccountNumber, line.IsIncludeGST, line.IsMaterialCertRequired, line.InvoiceNumber, line.Internal, line.GstAmount));
                    lastPoLineId++;
                    await _context.SaveChangesAsync(cancellationToken);
                }
            }
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }
}