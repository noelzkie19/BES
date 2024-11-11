using BES.Application.Common.Exceptions;
using BES.Application.Common.Interfaces;
using BES.Domain.Entities;
using MediatR;

namespace BES.Application.DeliveryAggregate.Commands.DeleteDelivery;

public class DeleteDelivery : IRequest
{
    public int Id { get; set; }
}


public class DeleteDeliveryHandler : IRequestHandler<DeleteDelivery>
{
    private readonly IApplicationDbContext _context;
    public DeleteDeliveryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(DeleteDelivery request, CancellationToken cancellationToken)
    {

        var entity = await _context.Deliveries
             .FindAsync(new object[] { request.Id }, cancellationToken);

        if (entity == null)
        {
            throw new NotFoundException(nameof(Delivery), request.Id);
        }

        _context.Deliveries.Remove(entity);

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}
