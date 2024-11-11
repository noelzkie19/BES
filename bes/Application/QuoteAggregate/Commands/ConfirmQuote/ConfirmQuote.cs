using BES.Application.Common.Exceptions;
using BES.Application.Common.Interfaces;
using BES.Domain.Entities;
using MediatR;

namespace BES.Application.QuoteAggregate.Commands.ConfirmQuote;

public class ConfirmQuote : IRequest<int>
{
    public int Id { get; set; }
}

public class ConfirmQuoteHandler : IRequestHandler<ConfirmQuote, int>
{
    private readonly IApplicationDbContext _context;
    public ConfirmQuoteHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<int> Handle(ConfirmQuote request, CancellationToken cancellationToken)
    {

        var quote = await _context.Quotes
             .FindAsync(new object[] { request.Id }, cancellationToken);
        if (quote == null)
        {
            throw new NotFoundException(nameof(Quote), request.Id);
        }
        quote.Confirm("For Client Confirmation");
        await _context.SaveChangesAsync(cancellationToken);
        return quote.Id;
    }
}
