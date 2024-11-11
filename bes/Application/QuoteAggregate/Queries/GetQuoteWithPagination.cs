using AutoMapper;
using AutoMapper.QueryableExtensions;
using BES.Application.Common.Interfaces;
using BES.Application.Common.Mappings;
using BES.Application.Common.Models;
using BES.Application.QuoteAggregate.Model;
using MediatR;
using System.Linq.Dynamic.Core;

namespace BES.Application.QuoteAggregate.Queries.GetQuoteWithPagination;

public class GetQuoteWithPagination : IRequest<PaginatedList<QuoteDto>>
{
    public int Skip { get; set; } = 1;
    public int Take { get; set; } = 10;
    public string Sort { get; set; } = string.Empty;
    public string? Search { get; set; } = string.Empty;
    public string? ClientName { get; set; } = string.Empty;
    public string? ClientContactPerson { get; set; } = string.Empty;
    public string? CreatedBy { get; set; } = string.Empty;
    public string? QuoteNumber { get; set; } = string.Empty;
    public string? Status { get; set; } = string.Empty;
    public string? AdvanceSearch { get; set; } = string.Empty;
    public bool IncludeVersion { get; set; } = false;
}

public class GetQuoteWithPaginationHandler : IRequestHandler<GetQuoteWithPagination, PaginatedList<QuoteDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetQuoteWithPaginationHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<PaginatedList<QuoteDto>> Handle(GetQuoteWithPagination request, CancellationToken cancellationToken)
    {
        IQueryable<QuoteVm> list = (from quote in _context.Quotes
                                    join tClient in _context.Clients on quote.ClientId equals tClient.Id
                                    into clientTemp
                                    from client in clientTemp.DefaultIfEmpty()
                                    join tUser in _context.UserAccounts on quote.CreatedBy equals tUser.Email
                                    into userTemp
                                    from user in userTemp.DefaultIfEmpty()

                                    join lQuote in _context.Quotes on quote.LatestVersion equals lQuote.QuoteNumber
                                    into quoteTemp
                                    from tQuote in quoteTemp.DefaultIfEmpty()

                                    // join job in _context.Jobs
                                    // on quote.Id equals job.QuoteNumberSource into jobTemp
                                    // from
                                    // jobItem in jobTemp.DefaultIfEmpty()
                                    where quote.Deleted == null
                                    select new QuoteVm
                                    {
                                        Quote = quote,
                                        Client = client,
                                        UserAccount = user,
                                        userName = user.FirstName + ' ' + user.LastName,
                                        LatestQuoteId = tQuote.Id
                                    });

        PaginatedList<QuoteDto> quotes = await list
         .Where(item => string.IsNullOrEmpty(request.AdvanceSearch)
                || item.Client.Name.StartsWith(request.AdvanceSearch)
                || item.Quote.QuoteNumber.StartsWith(request.AdvanceSearch))
        .Where(item => string.IsNullOrEmpty(request.ClientName) || item.Client.Name.StartsWith(request.ClientName))
        .Where(item => string.IsNullOrEmpty(request.CreatedBy) || item.userName.StartsWith(request.CreatedBy))
        // .Where(item => string.IsNullOrEmpty(request.QuoteNumber) || item.Quote.LatestVersion.StartsWith(request.QuoteNumber))
        .Where(item => string.IsNullOrEmpty(request.Status) || item.Quote.Status.StartsWith(request.Status))
        .Where(item => string.IsNullOrEmpty(request.ClientContactPerson) || item.Client.ContactPerson.StartsWith(request.ClientContactPerson))
        .Where(item => !request.IncludeVersion ? !item.Quote.QuoteNumber.Contains("-") : true)
        .Where(item => request.IncludeVersion ? 
            (string.IsNullOrEmpty(request.QuoteNumber) || item.Quote.QuoteNumber.Contains(request.QuoteNumber)) 
            : (string.IsNullOrEmpty(request.QuoteNumber) || item.Quote.LatestVersion.Contains(request.QuoteNumber)) )
      

        .OrderBy(request.Sort)
        .ProjectTo<QuoteDto>(_mapper.ConfigurationProvider)
        .PaginatedListGridAsync(request.Skip, request.Take);

        // Get latest version data of quotes
        if (!request.IncludeVersion) 
        {
            foreach(var quote in quotes.Items.Where(x => x.LatestVersion != null && x.LatestVersion.Contains("-")))
            {
                var data = _context.Quotes.Where(x => x.QuoteNumber == quote.LatestVersion).FirstOrDefault();
                if (data != null)
                {
                    var client = _context.Clients.Where(x => x.Id == data.ClientId).FirstOrDefault();
                    quote.Description = data.Description;
                    quote.QuoteNumber = data.QuoteNumber;
                    quote.Id = data.Id;
                    quote.ClientName = client?.Name;
                    quote.Status = data.Status;
                    quote.ContactPerson = client.ContactPerson;
                }
            }
        }
        return quotes;
    }
}