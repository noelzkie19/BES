using BES.Application.Common.Exceptions;
using BES.Application.Common.Interfaces;
using BES.Domain.Entities;
using MediatR;

namespace BES.Application.QuoteAggregate.Commands.PrintQuote;

public class PrintQuote : IRequest<int>
{
    public int Id { get; set; }
}

public class PrintQuoteHandler : IRequestHandler<PrintQuote, int>
{
    private readonly IApplicationDbContext _context;
    public PrintQuoteHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<int> Handle(PrintQuote request, CancellationToken cancellationToken)
    {

        var quote = await _context.Quotes
             .FindAsync(new object[] { request.Id }, cancellationToken);
        if (quote == null)
        {
            throw new NotFoundException(nameof(Quote), request.Id);
        }
        quote.PrintQuote("Completed");
        await _context.SaveChangesAsync(cancellationToken);
        return quote.Id;
    }
}
