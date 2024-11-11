using AutoMapper;
using AutoMapper.QueryableExtensions;
using BES.Application.Common.Interfaces;
using BES.Application.Common.Models;
using MediatR;
using BES.Application.Common.Mappings;
using System.Linq.Dynamic.Core;
using Microsoft.EntityFrameworkCore;
using BES.Application.JobAggregate.Model;

namespace BES.Application.JobAggregate.Queries.GetJobByClientId;

public class GetJobByClientId : IRequest<List<JobByClientDto>>
{
    public int ClientId { get; set; }
}

public class GetJobByClientIdHandler : IRequestHandler<GetJobByClientId, List<JobByClientDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetJobByClientIdHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<List<JobByClientDto>> Handle(GetJobByClientId request, CancellationToken cancellationToken)
    {
        var clientAddressList = await _context.Jobs
            .Where( d=> d.ClientId == request.ClientId)
            .ProjectTo<JobByClientDto>(_mapper.ConfigurationProvider)
            .ToListAsync();
        return clientAddressList;
    }
}
  

