using AutoMapper;
using AutoMapper.QueryableExtensions;
using BES.Application.Common.Interfaces;
using BES.Application.Common.Models;
using MediatR;
using BES.Application.Common.Mappings;
using BES.Application.ResourceAggregate.Model;
using System.Linq.Dynamic.Core;

namespace BES.Application.ResourceAggregate.Queries.GetResourcesWithPagination;

public class GetResourcesWithPagination : IRequest<PaginatedList<ResourceDTO>>
{
    public int Skip { get; set; } = 0;
    public int Take { get; set; } = 10;
    public string Sort { get; set; } = string.Empty;
    public string? Search { get; set; } = string.Empty;
    public string? Name { get; set; } = string.Empty;
    public string? Description { get; set; } = string.Empty;
    public decimal? HourlyRate { get; set; }
    public bool? IsActive { get; set; }

}

public class GetResourcesWithPaginationHandler : IRequestHandler<GetResourcesWithPagination, PaginatedList<ResourceDTO>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    public GetResourcesWithPaginationHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    public async Task<PaginatedList<ResourceDTO>> Handle(GetResourcesWithPagination request, CancellationToken cancellationToken)
    {
        var Resources = await _context.Resources
            // .Where($"Name.contains(@0) and Description.contains(@1) and HourlyRate.equals(@2) or InActive.equals(@3)",
            // request.Name,request.Description,request.HourlyRate,request.InActive)
            //  .Where($"InActive.equals(@0)" ,
            //  false)
            .Where(request.Search is null ? "" : request.Search)
            .Where(item => item.Deleted == null)
            .OrderBy(request.Sort)
            .ProjectTo<ResourceDTO>(_mapper.ConfigurationProvider)
            .PaginatedListGridAsync(request.Skip, request.Take);
        return Resources;
    }
}