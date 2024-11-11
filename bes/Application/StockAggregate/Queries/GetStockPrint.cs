using AutoMapper;
using AutoMapper.QueryableExtensions;
using BES.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;
using BES.Application.StockAggregate.Model;
using BES.Application.Common.Mappings;

namespace BES.Application.StockAggregate.Queries.GetStockPrint;

public class GetStockPrint : IRequest<IList<StockPrintDto>>
{
    public string SortBy { get; set; } = string.Empty;
    public int ClientId { get; set; }

}
public class GetStockPrintHandler : IRequestHandler<GetStockPrint, IList<StockPrintDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    public GetStockPrintHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<IList<StockPrintDto>> Handle(GetStockPrint request, CancellationToken cancellationToken)
    {
        var list = (from stock in _context.Stocks
                    join tJob in _context.Jobs on stock.JobId equals tJob.Id
                    into jobTemp
                    from job in jobTemp.DefaultIfEmpty()

                    join tClient in _context.Clients on job.ClientId equals tClient.Id
                    into clientTemp
                    from client in clientTemp.DefaultIfEmpty()
                    where stock.Deleted == null
                    select new StockVm
                    {
                        Job = job,
                        Client = client,
                        Stock = stock
                    });
        var stocks = await list
                    .Where(item => request.ClientId == 0 || item.Client.Id == request.ClientId)
                    .OrderBy(request.SortBy)
                    .ProjectTo<StockPrintDto>(_mapper.ConfigurationProvider)
                    .ToListAsync();
        return stocks;

    }
}