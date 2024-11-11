using AutoMapper;
using AutoMapper.QueryableExtensions;
using BES.Application.Common.Interfaces;
using BES.Application.Common.Models;
using MediatR;
using BES.Application.Common.Mappings;
using BES.Application.DeliveryAggregate.Model;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;

namespace BES.Application.DeliveryAggregate.Queries.GetDeliveryWithPagination;

public class GetDeliveryWithPagination : IRequest<PaginatedList<DeliveryDto>>
{
    public int Skip { get; set; } = 1;
    public int Take { get; set; } = 10;
    public string Sort { get; set; } = string.Empty;
}

public class GetDeliveryWithPaginationHandler : IRequestHandler<GetDeliveryWithPagination, PaginatedList<DeliveryDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetDeliveryWithPaginationHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<PaginatedList<DeliveryDto>> Handle(GetDeliveryWithPagination request, CancellationToken cancellationToken)
    {
        var deliveryList = await _context.Jobs
           .OrderBy(request.Sort)
           .ProjectTo<DeliveryDto>(_mapper.ConfigurationProvider)
           .PaginatedListGridAsync(request.Skip, request.Take);

        return deliveryList;
    }
}


