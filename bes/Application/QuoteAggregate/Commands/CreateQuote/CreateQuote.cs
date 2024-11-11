using MediatR;
using BES.Application.Common.Interfaces;
using BES.Domain.Entities;
using BES.Application.QuoteAggregate.Model;
using BES.Application.Common.Exceptions;

namespace BES.Application.QuoteAggregate.Commands.CreateQuote;

public class CreateQuote : IRequest<int>
{
    public int? Number { get; set; }
    public int ClientId { get; set; }
    public string Description { get; set; } = string.Empty;
    public string QuoteNumber { get; private set;} = string.Empty;
    public string QuoteNumberSource { get; set; } = string.Empty;
    public string ContactName { get; set; } = string.Empty;
    public DateTime? DatePrinted { get; private set; }
    public string Status { get; private set;} = string.Empty;
    public bool Version { get; set; }
    // public int LatestVersion { get; set;}
    public bool Is30DaysFromInv { get; set; }
    public bool IsCod { get; set; }
    public bool IsDepositReceivedCOD { get; set; }
    public bool ProgressPaymentRequired { get; set; }
    public string Notes { get; set; }
    // public virtual IList<QuoteMaterialDto> Materials { get; set; }
    public IList<QuoteDetailDto> Details { get; set; }

}

public class CreateQuoteHandler : IRequestHandler<CreateQuote, int>
{
    private readonly IApplicationDbContext _context;

    public CreateQuoteHandler(IApplicationDbContext context, IIdentityService identityService)
    {
        _context = context;
    }
    public async Task<int> Handle(CreateQuote request, CancellationToken cancellationToken)
    {
        try
        {
            var status = "On Going";
            var lastQuote = _context.Quotes
                // .Where(p => p.QuoteNumber.Contains("-"))
                .OrderByDescending(a => a.Id)
                .Select(p => p).FirstOrDefault();
            var lastSupplier = _context.Suppliers.OrderByDescending(a => a.Id)
                .Select(p => p).FirstOrDefault();

            var quoteId = lastQuote == null ? "00001" : (lastQuote.Id + 1).ToString().PadLeft(5, '0');
            var quoteNumber = lastQuote == null ? 1 : (lastQuote.Id + 1);
            var supplierId = lastSupplier == null ? 1 : lastSupplier.Id;
            // if (request.Version) {
            //     request.QuoteNumberSource = request.QuoteNumberSource.Remove(0, 1);
            //     string[] quoteNumberOrigin = request.QuoteNumberSource.Split('-');
            //     //update the original version
            //     var quoteOriginalVersion = _context.Quotes.Where(p => p.QuoteNumber == "Q" + quoteNumberOrigin[0]).FirstOrDefault();
            //     if (quoteOriginalVersion == null)
            //     {
            //         throw new NotFoundException(nameof(Quote), request.QuoteNumberSource);
            //     }
            //     request.LatestVersion = quoteOriginalVersion.LatestVersion + 1;
            //     quoteOriginalVersion.UpdateLatestVersion(request.LatestVersion);
            //     quoteId = quoteNumberOrigin[0] + "-" + request.LatestVersion.ToString();
            // }

            var newQuote = new Quote(quoteNumber, request.Description, request.ClientId, status,"Q" + quoteId,request.QuoteNumberSource, "Q" + quoteId,
                request.Is30DaysFromInv, request.IsCod, request.IsDepositReceivedCOD, request.ProgressPaymentRequired, request.Notes);
            _context.Quotes.Add(newQuote);
            await _context.SaveChangesAsync(cancellationToken);

            foreach (var detail in request.Details)
            {
                var quote = new QuoteDetail(detail.Description, detail.Drawing, detail.Revision, detail.Quantity, detail.CostPerUnit,
                            detail.TotalCost, detail.EstLeadTime, newQuote.Id);
                _context.QuoteDetails.Add(quote);
            }
            await _context.SaveChangesAsync(cancellationToken);
            return newQuote.Id;

        }
        catch (System.Exception ex)
        {
            throw ex;
        }
    }
}