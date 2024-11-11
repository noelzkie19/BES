using AutoMapper;
using AutoMapper.QueryableExtensions;
using BES.Application.Common.Interfaces;
using BES.Application.Common.Models;
using MediatR;
using BES.Application.Common.Mappings;
using BES.Application.ClientAggregate.Model;
using System.Linq.Dynamic.Core;
using BES.Application.Common.Repository.Clients;

namespace BES.Application.ClientAggregate.Queries.GetClientWithPagination;

public class GetClientWithPagination : IRequest<PaginatedList<ClientDto>>
{
    public int Skip { get; set; } = 1;
    public int Take { get; set; } = 10;
    public string Sort { get; set; } = string.Empty;
    public string? Search { get; set; } = string.Empty;
    public string? AdvanceSearch { get; set; } = string.Empty;
}

public class GetClientWithPaginationHandler : IRequestHandler<GetClientWithPagination, PaginatedList<ClientDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly IClientRepository _repository;

    public GetClientWithPaginationHandler(IApplicationDbContext context, IMapper mapper, IClientRepository repository)
    {
        _context = context;
        _mapper = mapper;
        _repository = repository;
    }

    public async Task<PaginatedList<ClientDto>> Handle(GetClientWithPagination request, CancellationToken cancellationToken)
    {
        var list = (from supp in _context.Clients
                    join address in _context.ClientAddresses on new { Id = supp.Id, Default = true }
                    equals new { Id = address.ClientId, Default = address.Default }
                    into sadd
                    from subadd in sadd.DefaultIfEmpty()
                    select new ClientVm
                    {
                        Client = supp,
                        ClientAddress = subadd
                    });

        var clientlist = await list
        .Where(request.Search is null ? "" : request.Search)
        .Where(item => string.IsNullOrEmpty(request.AdvanceSearch) 
                || item.Client.Id.ToString().StartsWith(request.AdvanceSearch)
                || item.Client.Name.StartsWith(request.AdvanceSearch)
                || item.Client.ContactPerson.StartsWith(request.AdvanceSearch)
                || item.ClientAddress.Suburb.StartsWith(request.AdvanceSearch)
                || item.Client.Phone.StartsWith(request.AdvanceSearch)
                || item.Client.OperatingHrs.StartsWith(request.AdvanceSearch))
        .OrderBy(request.Sort)
        .ProjectTo<ClientDto>(_mapper.ConfigurationProvider)
        .PaginatedListGridAsync(request.Skip, request.Take);

        return clientlist;
    }
}


