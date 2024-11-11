using AutoMapper;
using AutoMapper.QueryableExtensions;
using BES.Application.Common.Interfaces;
using BES.Application.Common.Models;
using MediatR;
using BES.Application.Common.Mappings;
using BES.Application.ClientAggregate.Model;
using System.Linq.Dynamic.Core;
using Microsoft.EntityFrameworkCore;

namespace BES.Application.ClientAggregate.Queries.GetClientById;

public class GetClientById : IRequest<ClientDto>
{
    public int Id { get; set; }
}

public class GetClientByIdHandler : IRequestHandler<GetClientById, ClientDto>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetClientByIdHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<ClientDto> Handle(GetClientById request, CancellationToken cancellationToken)
    {
        {
            IQueryable<ClientVm> list = (from client in _context.Clients
                        join address in _context.ClientAddresses on new { Id = client.Id, Default = true }
                        equals new { Id = address.ClientId, Default = address.Default }
                        into sadd
                        from subadd in sadd.DefaultIfEmpty()
                        where client.Id == request.Id
                        select new ClientVm
                        {
                            Client = client,
                            ClientAddress = subadd
                        });

            ClientDto? clientAddressList = await list
                .ProjectTo<ClientDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync();

            return clientAddressList;
        }
    }
}


