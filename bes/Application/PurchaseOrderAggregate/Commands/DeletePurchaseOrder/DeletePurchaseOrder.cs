using BES.Application.Common.Exceptions;
using BES.Application.Common.Interfaces;
using BES.Domain.Entities;
using MediatR;

namespace BES.Application.PurchaseOrderAggregate.Commands.DeletePurchaseOrder;

public class DeletePurchaseOrder : IRequest
{
    public int Id { get; set; }
}


public class DeletePurchaseOrderHandler : IRequestHandler<DeletePurchaseOrder>
{
    private readonly IApplicationDbContext _context;
    public DeletePurchaseOrderHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(DeletePurchaseOrder request, CancellationToken cancellationToken)
    {

        var entity = await _context.Purchases
             .FindAsync(new object[] { request.Id }, cancellationToken);

        if (entity == null)
        {
            throw new NotFoundException(nameof(PurchaseLine), request.Id);
        }

        _context.Purchases.Remove(entity);

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}
