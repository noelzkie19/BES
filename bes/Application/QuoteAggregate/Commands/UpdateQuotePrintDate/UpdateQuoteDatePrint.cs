using BES.Application.Common.Exceptions;
using BES.Application.Common.Interfaces;
using BES.Domain.Entities;
using MediatR;

namespace BES.Application.QuoteAggregate.Commands.UpdateQuoteDatePrint;

public class UpdateQuoteDatePrint : IRequest<int>
{
    public int Id { get; set; }
}

public class UpdateQuoteDatePrintHandler : IRequestHandler<UpdateQuoteDatePrint, int>
{
    private readonly IApplicationDbContext _context;

    public UpdateQuoteDatePrintHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<int> Handle(UpdateQuoteDatePrint request, CancellationToken cancellationToken)
    {

        var quote = await _context.Quotes
             .FindAsync(new object[] { request.Id }, cancellationToken);
        if (quote == null)
        {
            throw new NotFoundException(nameof(Quote), request.Id);
        }
        quote.QuoteDatePrint();
        await _context.SaveChangesAsync(cancellationToken);
        return quote.Id;
    }
}
