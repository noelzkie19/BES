using BES.Application.Common.Exceptions;
using BES.Application.Common.Interfaces;
using BES.Domain.Entities;
using MediatR;

namespace BES.Application.SupplierAggregate.Commands.DeleteSupplier;

public class DeleteSupplier : IRequest
{
    public int Id { get; set; }
}


public class DeleteSupplierHandler : IRequestHandler<DeleteSupplier>
{
    private readonly IApplicationDbContext _context;
    public DeleteSupplierHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(DeleteSupplier request, CancellationToken cancellationToken)
    {

        var entity = await _context.Suppliers
             .FindAsync(new object[] { request.Id }, cancellationToken);

        if (entity == null)
        {
            throw new NotFoundException(nameof(Client), request.Id);
        }

        _context.Suppliers.Remove(entity);

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}
