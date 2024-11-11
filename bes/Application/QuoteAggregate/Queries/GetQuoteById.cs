using AutoMapper;
using AutoMapper.QueryableExtensions;
using BES.Application.Common.Exceptions;
using BES.Application.Common.Extensions;
using BES.Application.Common.Interfaces;
using BES.Application.QuoteAggregate.Model;
using BES.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;

namespace BES.Application.QuoteAggregate.Queries.GetQuoteById;

public class GetQuoteById : IRequest<QuoteDto>
{
    public int Id { get; set; }
}

public class GetQuoteByIdHandler : IRequestHandler<GetQuoteById, QuoteDto>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetQuoteByIdHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<QuoteDto> Handle(GetQuoteById request, CancellationToken cancellationToken)
    {
        IQueryable<QuoteVm> list = (from quote in _context.Quotes
                                    join tClient in _context.Clients on quote.ClientId equals tClient.Id
                                    into clientTemp
                                    from client in clientTemp.DefaultIfEmpty()
                                    where quote.Deleted == null
                                    where quote.Id == request.Id
                                    select new QuoteVm
                                    {
                                        Quote = quote,
                                        Client = client,
                                    });

        QuoteDto? quoteDetails = await list
            .ProjectTo<QuoteDto>(_mapper.ConfigurationProvider)
            .FirstOrDefaultAsync();

        if (quoteDetails == null)
            throw new NotFoundException("Quote does not exists.");

        // Version Count 
        var mainId = quoteDetails.ParentId == null ? quoteDetails.Id : quoteDetails.ParentId;
        if (mainId != null) {
           var versionList = _context.Quotes.Where(x => x.ParentId == mainId).Select(x => x.QuoteNumber).ToList();
           var totalVersion = versionList.Count();
           versionList.Insert(0, quoteDetails.QuoteNumber);
           quoteDetails.TotalVersion = totalVersion;
           quoteDetails.QuoteVersions = versionList
                .Distinct()
                .OrderBy(x => x)
                .ToList();
        }

        quoteDetails.Details = await _context.QuoteDetails
            .Where(x => x.QuoteId == request.Id)
            .Where(x => x.Deleted == null)
            .ProjectTo<QuoteDetailDto>(_mapper.ConfigurationProvider)
            .ToListAsync();
      


        return quoteDetails;
    }
}