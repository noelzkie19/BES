using AutoMapper;
using AutoMapper.QueryableExtensions;
using BES.Application.Common.Interfaces;
using BES.Application.Common.Models;
using MediatR;
using BES.Application.Common.Mappings;
using BES.Application.ResourceAggregate.Model;
using System.Linq.Dynamic.Core;
using Microsoft.EntityFrameworkCore;

namespace BES.Application.ResourceAggregate.Queries.GetResourceById;

public class GetResourceById : IRequest<ResourceDTO>
{
     public int Id { get; set; }
}

public class GetResourceByIdPaginationHandler : IRequestHandler<GetResourceById, ResourceDTO>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    public GetResourceByIdPaginationHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    public async Task<ResourceDTO> Handle(GetResourceById request, CancellationToken cancellationToken)
    {
        var Resources = await _context.Resources
            .Where(x => x.Id == request.Id)
            .ProjectTo<ResourceDTO>(_mapper.ConfigurationProvider)
            .FirstOrDefaultAsync();
            
        return Resources;
    }
}