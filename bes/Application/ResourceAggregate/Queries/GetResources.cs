using AutoMapper;
using AutoMapper.QueryableExtensions;
using BES.Application.Common.Interfaces;
using BES.Application.Common.Models;
using MediatR;
using BES.Application.Common.Mappings;
using BES.Application.ResourceAggregate.Model;
using System.Linq.Dynamic.Core;
using Microsoft.EntityFrameworkCore;

namespace BES.Application.ResourceAggregate.Queries.GetResources;

public class GetResources : IRequest<List<ResourceDTO>>
{
}

public class GetResourcesPaginationHandler : IRequestHandler<GetResources, List<ResourceDTO>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    public GetResourcesPaginationHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    public async Task<List<ResourceDTO>> Handle(GetResources request, CancellationToken cancellationToken)
    {
        var Resources = await _context.Resources
            .Where(x => x.Deleted == null && x.IsActive)
            .OrderBy(x => x.Name)
            .ProjectTo<ResourceDTO>(_mapper.ConfigurationProvider)
            .ToListAsync();
        return Resources;
    }
}