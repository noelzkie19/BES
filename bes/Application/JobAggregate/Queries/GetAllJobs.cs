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

namespace BES.Application.JobAggregate.Queries.GetAllJobs;

public class GetAllJobs : IRequest<List<JobNcrDto>>
{

}

public class GetAllJobsHandler : IRequestHandler<GetAllJobs, List<JobNcrDto>>
{
   private readonly IApplicationDbContext _context;
   private readonly IMapper _mapper;

   public GetAllJobsHandler(IApplicationDbContext context, IMapper mapper)
   {
        _context = context;
       _mapper = mapper;
   }
   public async Task<List<JobNcrDto>> Handle(GetAllJobs request, CancellationToken cancellationToken)
   {
        try {
            var jobs = await _context.Jobs
            .OrderByDescending(x => x.Id)
            .ProjectTo<JobNcrDto>(_mapper.ConfigurationProvider)
            .ToListAsync();
        
             return jobs;
        }catch(Exception ex) {
            return new List<JobNcrDto>();
        }
   }
}