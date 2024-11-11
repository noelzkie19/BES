using AutoMapper;
using AutoMapper.QueryableExtensions;
using BES.Application.Common.Interfaces;
using BES.Application.JobAggregate.Model;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BES.Application.JobAggregate.Queries.GetNcrs;

public class GetNcrs : IRequest<List<NcrDto>>
{
}

public class GetNcrsHandler : IRequestHandler<GetNcrs, List<NcrDto>>
{
   private readonly IApplicationDbContext _context;
   private readonly IMapper _mapper;

   public GetNcrsHandler(IApplicationDbContext context, IMapper mapper)
   {
        _context = context;
       _mapper = mapper;
   }
   public async Task<List<NcrDto>> Handle(GetNcrs request, CancellationToken cancellationToken)
   {
        var jobsTypes = await _context.NonConformances
        .Where(x => !string.IsNullOrEmpty(x.NcrNumber))
        .OrderByDescending(x => x.Id)
        .ProjectTo<NcrDto>(_mapper.ConfigurationProvider)
        .ToListAsync();

        return jobsTypes;
   }
}