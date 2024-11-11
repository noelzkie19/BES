using AutoMapper;
using AutoMapper.QueryableExtensions;
using BES.Application.Common.Interfaces;
using BES.Application.Common.Models;
using MediatR;
using BES.Application.Common.Mappings;
using BES.Application.StockAggregate.Model;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;

namespace BES.Application.StockAggregate.Queries.GetStockById;

public class GetStockById : IRequest<StockDto>
{
    public int Id { get; set; }
}

public class GetStockByIdHandler : IRequestHandler<GetStockById, StockDto>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetStockByIdHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<StockDto> Handle(GetStockById request, CancellationToken cancellationToken)
    {
        var list = (from stock in _context.Stocks
                    join tJob in _context.Jobs on stock.JobId equals tJob.Id
                    into jobTemp
                    from job in jobTemp.DefaultIfEmpty()

                    join tClient in _context.Clients on job.ClientId equals tClient.Id
                    into clientTemp
                    from client in clientTemp.DefaultIfEmpty()

                    where stock.Id == request.Id
                    select new StockVm
                    {
                        Job = job,
                        Client = client,
                        Stock = stock
                    });

        var stockDetail = await list
        .ProjectTo<StockDto>(_mapper.ConfigurationProvider)
        .FirstOrDefaultAsync();
       
        return stockDetail;
    }
}


