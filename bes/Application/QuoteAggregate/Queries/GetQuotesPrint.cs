using AutoMapper;
using AutoMapper.QueryableExtensions;
using BES.Application.Common.Exceptions;
using BES.Application.Common.Interfaces;
using BES.Application.QuoteAggregate.Model;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;

namespace BES.Application.QuoteAggregate.Queries.GetQuotesPrint;

public class GetQuotesPrint : IRequest<List<QuoteDto>>
{
    public bool IsItemised { get; set; }
    public string[] Quotes { get; set; }
}

public class GetQuotesPrintHandler : IRequestHandler<GetQuotesPrint, List<QuoteDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetQuotesPrintHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<List<QuoteDto>> Handle(GetQuotesPrint request, CancellationToken cancellationToken)
    {
        List<QuoteDto> quoteDetails = new List<QuoteDto>();
        foreach (var data in request.Quotes)
        {
                IQueryable<QuoteVm> list = (from quote in _context.Quotes
                    join tClient in _context.Clients on quote.ClientId equals tClient.Id
                    into clientTemp
                    from client in clientTemp.DefaultIfEmpty()
                    where quote.Deleted == null
                    where quote.QuoteNumber == data
                    select new QuoteVm
                    {
                        Quote = quote,
                        Client = client,
                    });

            var quoteDetail = await list
                .ProjectTo<QuoteDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync();
                
            if (quoteDetail != null)
            {
                if (request.IsItemised) {
                     var details = await _context.QuoteDetails
                    .Where(x => x.QuoteId == quoteDetail.Id)
                    .Where(x => x.Deleted == null)
                    .OrderBy(x => x.CreatedBy)
                    .ProjectTo<QuoteDetailDto>(_mapper.ConfigurationProvider)
                    .ToListAsync();

                    quoteDetail.Details = details;
                } else {
                     var detail = await _context.QuoteDetails
                    .Where(x => x.QuoteId == quoteDetail.Id)
                    .Where(x => x.Deleted == null)
                    .OrderBy(x => x.CreatedBy)
                    .ProjectTo<QuoteDetailDto>(_mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync();
                     quoteDetail.Details = new List<QuoteDetailDto>();
                     if (detail != null)
                        quoteDetail.Details.Add(detail);
                }
                quoteDetails.Add(quoteDetail);
            }
        }
            
   

        if (quoteDetails == null)
            throw new NotFoundException("Quote does not exists.");

        return quoteDetails.ToList();
    }
}