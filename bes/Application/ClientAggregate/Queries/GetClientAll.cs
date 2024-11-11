using AutoMapper;
using AutoMapper.QueryableExtensions;
using BES.Application.Common.Interfaces;
using BES.Application.ClientAggregate.Model;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BES.Application.ClientAggregate.Queries.GetClientAll;

public class GetClientAll : IRequest<IList<ClientDto>>
{
}

public class GetClientAllHandler : IRequestHandler<GetClientAll, IList<ClientDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    public GetClientAllHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    public async Task<IList<ClientDto>> Handle(GetClientAll request, CancellationToken cancellationToken)
    {
        var list = (from client in _context.Clients
                    join address in _context.ClientAddresses on new { Id = client.Id, Default = true }
                    equals new { Id = address.ClientId, Default = address.Default }
                    into sadd
                    from subadd in sadd.DefaultIfEmpty()
                    select new ClientVm
                    {
                        Client = client,
                        ClientAddress = subadd
                    });

        var clientlist = await list
            .ProjectTo<ClientDto>(_mapper.ConfigurationProvider)
            .ToListAsync();

        return clientlist;
    }
}