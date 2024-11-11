using AutoMapper;
using AutoMapper.QueryableExtensions;
using BES.Application.Common.Interfaces;
using BES.Application.Common.Models;
using MediatR;
using BES.Application.Common.Mappings;
using BES.Application.ClientAggregate.Model;
using System.Linq.Dynamic.Core;
using Microsoft.EntityFrameworkCore;

namespace BES.Application.ClientAggregate.Queries.GetClientList;

public class GetClientList : IRequest<List<ClientListDto>>
{
}

public class GetClientListHandler : IRequestHandler<GetClientList, List<ClientListDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetClientListHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<List<ClientListDto>> Handle(GetClientList request, CancellationToken cancellationToken)
    {
        var clientAddressList = await _context.Clients
            .OrderBy(x => x.Name)
            // .Where(item => item.ClientType == "Active Client")
            .ProjectTo<ClientListDto>(_mapper.ConfigurationProvider)
            .ToListAsync();
        return clientAddressList;
    }
}
  

