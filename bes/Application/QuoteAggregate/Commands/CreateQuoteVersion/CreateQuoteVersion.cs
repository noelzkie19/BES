using System.Linq.Dynamic.Core;
using AutoMapper.QueryableExtensions;
using BES.Application.Common.Exceptions;
using BES.Application.Common.Interfaces;
using BES.Application.QuoteAggregate.Model;
using BES.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BES.Application.QuoteAggregate.Commands.DeleteQuote;

public class CreateQuoteVersion : IRequest<int>
{
    public int Id { get; set; }
}

public class CreateQuoteVersionHandler : IRequestHandler<CreateQuoteVersion, int>
{
    private readonly IApplicationDbContext _context;
    public CreateQuoteVersionHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<int> Handle(CreateQuoteVersion request, CancellationToken cancellationToken)
    {

        var entity = await _context.Quotes
             .FindAsync(new object[] { request.Id }, cancellationToken);

        if (entity == null)
        {
            throw new NotFoundException(nameof(Quote), request.Id);
        }
        var mainId = entity.ParentId == null ? entity.Id : entity.ParentId;
        var lastQuote = _context.Quotes
            .OrderByDescending(a => a.Id)
            .Select(p => p).FirstOrDefault();
        var quoteId = lastQuote == null ? "00001" : (lastQuote.Id + 1).ToString().PadLeft(5, '0');
        var quoteNumber = lastQuote == null ? 1 : (lastQuote.Id + 1);

        // Update Current Quote
        entity.SetTotalVersion(entity.TotalVersion + 1);
        _context.Quotes.Update(entity);
        await _context.SaveChangesAsync(cancellationToken);

        // Update Main Quote
        if (mainId != null) 
        {
           var totalVersion = _context.Quotes.Where(x => x.ParentId == mainId).Count() + 1;
           var quoteParent = await _context.Quotes
             .FindAsync(new object[] { mainId }, cancellationToken);

           if (quoteParent != null) {
            // New QuoteNumber
            var newQuoteNumber = quoteParent.QuoteNumber + "-" + totalVersion;

             quoteParent.SetTotalVersion(totalVersion);
             quoteParent.UpdateDateLatestVersion();
             quoteParent.UpdateLatestVersion(newQuoteNumber);
             _context.Quotes.Update(quoteParent);
             await _context.SaveChangesAsync(cancellationToken);
             
             entity.NewVersion(newQuoteNumber, quoteNumber);
           }
        }

       // Add Copy Quote
        entity.SetTotalVersion(0);
        entity.UpdateDateLatestVersion();
        _context.Quotes.Add(entity);
        await _context.SaveChangesAsync(cancellationToken);

        var details = await _context.QuoteDetails
        .Where(x => x.QuoteId == request.Id)
        .Where(x => x.Deleted == null)
        .ToListAsync();

        foreach (var detail in details)
        {
            var quote = new QuoteDetail(detail.Description, detail.Drawing, detail.Revision, detail.Quantity, detail.CostPerUnit,
                        detail.TotalCost, detail.EstLeadTime, entity.Id);
            _context.QuoteDetails.Add(quote);
        }
        await _context.SaveChangesAsync(cancellationToken);

        return entity.Id;
    }
}
