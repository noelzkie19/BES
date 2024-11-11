using BES.Application.Common.Exceptions;
using BES.Application.Common.Interfaces;
using BES.Domain.Entities;
using MediatR;

namespace BES.Application.StockAggregate.Commands.DeleteStock;

public class DeleteStock : IRequest
{
    public int Id { get; set; }
}

public class DeleteStockHandler : IRequestHandler<DeleteStock>
{
    private readonly IApplicationDbContext _context;
    public DeleteStockHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(DeleteStock request, CancellationToken cancellationToken)
    {

        var entity = await _context.Stocks
             .FindAsync(new object[] { request.Id }, cancellationToken);

        if (entity == null)
        {
            throw new NotFoundException(nameof(Stock), request.Id);
        }

        _context.Stocks.Remove(entity);

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}
