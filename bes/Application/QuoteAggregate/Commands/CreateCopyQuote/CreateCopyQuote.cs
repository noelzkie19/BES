using System.Linq.Dynamic.Core;
using AutoMapper.QueryableExtensions;
using BES.Application.Common.Exceptions;
using BES.Application.Common.Interfaces;
using BES.Application.QuoteAggregate.Model;
using BES.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BES.Application.QuoteAggregate.Commands.DeleteQuote;

public class CreateCopyQuote : IRequest<int>
{
    public int Id { get; set; }
}

public class CreateCopyQuoteHandler : IRequestHandler<CreateCopyQuote, int>
{
    private readonly IApplicationDbContext _context;
    public CreateCopyQuoteHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<int> Handle(CreateCopyQuote request, CancellationToken cancellationToken)
    {
        var originalId = request.Id;
        var entity = await _context.Quotes
             .FindAsync(new object[] { originalId }, cancellationToken);

        if (entity == null)
        {
            throw new NotFoundException(nameof(Quote), originalId);
        }
        var lastQuote = _context.Quotes
            .OrderByDescending(a => a.Id)
            .Select(p => p).FirstOrDefault();

        var quoteId = lastQuote == null ? "00001" : (lastQuote.Id + 1).ToString().PadLeft(5, '0');
        var quoteNumber = lastQuote == null ? 1 : (lastQuote.Id + 1);
        
        entity.CopyQuote("Q" + quoteId, quoteNumber);
        _context.Quotes.Add(entity);
        await _context.SaveChangesAsync(cancellationToken);

        // Insert Details
        var quoteDetails = await _context.QuoteDetails
        .Where(x => x.QuoteId == originalId)
        .ToListAsync();
        
        foreach (var detail in quoteDetails)
        {
            var quote = new QuoteDetail(detail.Description, detail.Drawing, detail.Revision, detail.Quantity, detail.CostPerUnit,
                        detail.TotalCost, detail.EstLeadTime, entity.Id);
            _context.QuoteDetails.Add(quote);
        }
        await _context.SaveChangesAsync(cancellationToken);

        return entity.Id;
    }
}
