using AutoMapper;
using AutoMapper.QueryableExtensions;
using BES.Application.Common.Exceptions;
using BES.Application.Common.Interfaces;
using BES.Application.QuoteAggregate.Model;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;

namespace BES.Application.QuoteAggregate.Queries.GetQuoteWithVersion;

public class GetQuoteWithVersion : IRequest<List<QuoteDto>>
{
    public string QuoteNumber { get; set; } = string.Empty;
}

public class GetQuoteWithVersionHandler : IRequestHandler<GetQuoteWithVersion, List<QuoteDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetQuoteWithVersionHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<List<QuoteDto>> Handle(GetQuoteWithVersion request, CancellationToken cancellationToken)
    {
        IQueryable<QuoteVm> list = (from quote in _context.Quotes
                    join tClient in _context.Clients on quote.ClientId equals tClient.Id
                    into clientTemp
                    from client in clientTemp.DefaultIfEmpty()
                    where quote.Deleted == null
                    where quote.QuoteNumber.Contains(request.QuoteNumber + "-")
                    select new QuoteVm
                    {
                        Quote = quote,
                        Client = client,
                    });

        List<QuoteDto> quoteDetails = await list
            .ProjectTo<QuoteDto>(_mapper.ConfigurationProvider)
            .ToListAsync();

        if (quoteDetails == null)
            throw new NotFoundException("Quote does not exists.");

        return quoteDetails.ToList();
    }
}