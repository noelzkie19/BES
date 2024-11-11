using AutoMapper;
using AutoMapper.QueryableExtensions;
using BES.Application.Common.Interfaces;
using MediatR;
using System.Linq.Dynamic.Core;
using Microsoft.EntityFrameworkCore;
using BES.Application.PurchaseOrderAggregate.Models;

namespace BES.Application.PurchaseOrderAggregate.Queries.GetAvailablePo;

public class GetAvailablePo : IRequest<List<PurchaseNCDto>>
{
    public string? keyword { get; set; }
}

public class GetAvailablePoHandler : IRequestHandler<GetAvailablePo, List<PurchaseNCDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetAvailablePoHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    public async Task<List<PurchaseNCDto>> Handle(GetAvailablePo request, CancellationToken cancellationToken)
    {

        var jobs = await _context.Purchases
        .OrderByDescending(x => x.PurchaseNumber)
        .ProjectTo<PurchaseNCDto>(_mapper.ConfigurationProvider)
        .ToListAsync();

        return jobs;
    }
}