using AutoMapper;
using AutoMapper.QueryableExtensions;
using BES.Application.Common.Interfaces;
using BES.Application.Common.Models;
using MediatR;
using BES.Application.Common.Mappings;
using BES.Application.StockAggregate.Model;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;

namespace BES.Application.StockAggregate.Queries.GetStockWithPagination;

public class GetStockWithPagination : IRequest<PaginatedList<StockDto>>
{
    public int Skip { get; set; } = 1;
    public int Take { get; set; } = 10;
    public string Sort { get; set; } = string.Empty;
    public string? Search { get; set; } = string.Empty;
    public string? AdvanceSearch { get; set; } = string.Empty;
}

public class GetStockWithPaginationHandler : IRequestHandler<GetStockWithPagination, PaginatedList<StockDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetStockWithPaginationHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<PaginatedList<StockDto>> Handle(GetStockWithPagination request, CancellationToken cancellationToken)
    {
        IQueryable<StockVm> stockVms = (from stock in _context.Stocks
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

        PaginatedList<StockDto> stocks = await stockVms
                    .Where(request.Search is null ? "" : request.Search)
                    .Where(item => string.IsNullOrEmpty(request.AdvanceSearch)
                    || item.Job.JobId.StartsWith(request.AdvanceSearch)
                    || (" " + item.Client.Name).Contains(" " + request.AdvanceSearch)
                    || (" " + item.Stock.Description).Contains(" " + request.AdvanceSearch)
                    || (" " + item.Stock.Drawing).Contains(" " + request.AdvanceSearch)
                    || (" " + item.Stock.Revision).Contains(" " + request.AdvanceSearch)
                    || (" " + item.Stock.Quantity).Contains(" " + request.AdvanceSearch)
                    || (" " + item.Stock.Notes).Contains(" " + request.AdvanceSearch))
                    .OrderBy(request.Sort)
                    .ProjectTo<StockDto>(_mapper.ConfigurationProvider)
                    .PaginatedListGridAsync(request.Skip, request.Take);


        return stocks;
    }
}


