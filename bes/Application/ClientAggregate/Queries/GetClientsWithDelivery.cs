using AutoMapper;
using AutoMapper.QueryableExtensions;
using BES.Application.Common.Interfaces;
using MediatR;
using BES.Application.ClientAggregate.Model;
using System.Linq.Dynamic.Core;
using Microsoft.EntityFrameworkCore;

namespace BES.Application.ClientAggregate.Queries.GetClientsWithDelivery;

public class GetClientsWithDelivery : IRequest<List<ClientDto>>
{
    
}

public class GetClientsWithDeliveryHandler : IRequestHandler<GetClientsWithDelivery, List<ClientDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    

    public GetClientsWithDeliveryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<List<ClientDto>> Handle(GetClientsWithDelivery request, CancellationToken cancellationToken)
    {
         var list = (from supp in _context.Clients
                    join address in _context.ClientAddresses on supp.Id equals address.ClientId
                    into sadd
                    from subadd in sadd.DefaultIfEmpty()
                    select new ClientVm
                    {
                        Client = supp,
                        ClientAddress = subadd
                    });

        var clientlist = await list
            .ProjectTo<ClientDto>(_mapper.ConfigurationProvider)
            .ToListAsync();
            
        // var clientAddressList = await _context.ClientAddresses
        //     .Where( d=> d.ClientId == request.ClientId && d.AddressType == "Delivery Address")
        //     .ProjectTo<ClientDto>(_mapper.ConfigurationProvider)
        //     .ToListAsync();

        return clientlist;
    }
}
  

