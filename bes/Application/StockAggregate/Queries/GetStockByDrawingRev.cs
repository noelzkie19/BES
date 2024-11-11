using AutoMapper;
using AutoMapper.QueryableExtensions;
using BES.Application.Common.Interfaces;
using BES.Application.Common.Models;
using MediatR;
using BES.Application.Common.Mappings;
using BES.Application.StockAggregate.Model;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;

namespace BES.Application.StockAggregate.Queries.GetStockByDrawingRev;

public class GetStockByDrawingRev : IRequest<StockJobDto>
{
    public string Revision { get; set; }
    public string Drawing { get; set; }
    public int JobId { get; set; }
}

public class GetStockByDrawingRevHandler : IRequestHandler<GetStockByDrawingRev, StockJobDto>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetStockByDrawingRevHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<StockJobDto> Handle(GetStockByDrawingRev request, CancellationToken cancellationToken)
    {

        var stockDetail = await  _context.Stocks
        .Where(x => x.Revision == request.Revision && x.Drawing == request.Drawing)
        .ProjectTo<StockJobDto>(_mapper.ConfigurationProvider)
        .FirstOrDefaultAsync();

        if (stockDetail == null) 
        {
            stockDetail = await  _context.Stocks
            .Where(x => x.JobId == request.JobId)
            .ProjectTo<StockJobDto>(_mapper.ConfigurationProvider)
            .FirstOrDefaultAsync();
        }

        return stockDetail;
    }
}


