using BES.Application.Common.Exceptions;
using BES.Application.Common.Interfaces;
using BES.Domain.Entities;
using MediatR;

namespace BES.Application.QuoteAggregate.Commands.DeleteQuote;

public class DeleteQuote : IRequest
{
    public int Id { get; set; }
}

public class DeleteQuoteHandler : IRequestHandler<DeleteQuote>
{
    private readonly IApplicationDbContext _context;
    public DeleteQuoteHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(DeleteQuote request, CancellationToken cancellationToken)
    {

        var entity = await _context.Quotes
             .FindAsync(new object[] { request.Id }, cancellationToken);

        if (entity == null)
        {
            throw new NotFoundException(nameof(Quote), request.Id);
        }

        _context.Quotes.Remove(entity);

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}
