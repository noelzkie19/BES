using AutoMapper;
using AutoMapper.QueryableExtensions;
using BES.Application.Common.Interfaces;
using BES.Application.JobAggregate.Model;
using BES.Application.Common.Models;
using MediatR;
using BES.Application.Common.Mappings;
using System.Linq.Dynamic.Core;
using Microsoft.EntityFrameworkCore;
using BES.Application.JobAggregate.Models;

namespace BES.Application.JobAggregate.Queries.GetJobTypes;

public class GetJobTypes : IRequest<List<JobTypeDto>>
{
}

public class GetJobTypesHandler : IRequestHandler<GetJobTypes, List<JobTypeDto>>
{
   private readonly IApplicationDbContext _context;
   private readonly IMapper _mapper;

   public GetJobTypesHandler(IApplicationDbContext context, IMapper mapper)
   {
        _context = context;
       _mapper = mapper;
   }
   public async Task<List<JobTypeDto>> Handle(GetJobTypes request, CancellationToken cancellationToken)
   {
        var jobsTypes = await _context.JobTypes
        .OrderByDescending(x => x.Id)
        .ProjectTo<JobTypeDto>(_mapper.ConfigurationProvider)
        .ToListAsync();

        return jobsTypes;
   }
}