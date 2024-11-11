using BES.Application.Common.Exceptions;
using BES.Application.Common.Interfaces;
using BES.Application.Common.Models;
using BES.Domain.Entities;
using BES.Domain.Events;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BES.Application.NonConformanceAggregate.EventHandler.NcrNumberEventHandler;
public class NcrNumberEventHandler : INotificationHandler<DomainEventNotification<NcrNumberEvent>>
{
    private readonly IApplicationDbContext _context;
    public NcrNumberEventHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task Handle(DomainEventNotification<NcrNumberEvent> notification, CancellationToken cancellationToken)
    {
        long ncrNumberEvent = notification.DomainEvent.NcrNumberEventArgs.NcrNumber;
        
        if (ncrNumberEvent > 0) 
        {
            var _currentNcr = await _context.NcrNumbers.FirstOrDefaultAsync();
            
            if (_currentNcr == null) 
                throw new NotFoundException("No NcrNumber Found.");

            _currentNcr.Update(ncrNumberEvent + 1);
            _context.NcrNumbers.Update(_currentNcr);
        } 
        else 
        {
            var ncrNumber = new NcrNumber(ncrNumberEvent + 1);
            _context.NcrNumbers.Add(ncrNumber);

        }

        await _context.SaveChangesAsync(cancellationToken);
    }
}