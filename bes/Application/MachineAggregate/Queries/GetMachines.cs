using AutoMapper;
using AutoMapper.QueryableExtensions;
using BES.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using BES.Application.MachineAggregate.Models;
using System.Linq.Dynamic.Core;

namespace BES.Application.MachineAggregate.Queries.GetMachines;

public class GetMachines : IRequest<List<MachineDto>>
{
    public string? Keyword { get; set; }
}

public class GetMachinesHandler : IRequestHandler<GetMachines, List<MachineDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetMachinesHandler(IApplicationDbContext context, IMapper mapper, IIdentityService identityService)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<List<MachineDto>> Handle(GetMachines request, CancellationToken cancellationToken)
    {
        var machineList = await _context.Machines
               .OrderBy(x => x.Description)
               .ProjectTo<MachineDto>(_mapper.ConfigurationProvider)
               .ToListAsync();

        return machineList;
    }
}


