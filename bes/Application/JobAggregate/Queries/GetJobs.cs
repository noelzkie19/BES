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

namespace BES.Application.JobAggregate.Queries.GetJobs;

public class GetJobs : IRequest<List<JobDto>>
{
    public string? keyword { get; set; } 
}

public class GetJobsHandler : IRequestHandler<GetJobs, List<JobDto>>
{
   private readonly IApplicationDbContext _context;
   private readonly IMapper _mapper;

   public GetJobsHandler(IApplicationDbContext context, IMapper mapper)
   {
        _context = context;
       _mapper = mapper;
   }
   public async Task<List<JobDto>> Handle(GetJobs request, CancellationToken cancellationToken)
   {
        var list = (from job in _context.Jobs
                    join jobtype in _context.JobTypes on job.JobTypeId equals jobtype.Id
                    join client in _context.Clients on job.ClientId equals client.Id
                    where job.Deleted == null
                    && job.ParentJobNumber == null 
                    select new JobVm
                    {
                        Job = job,
                        Client = client,
                        JobType = jobtype,
                        Status = job.Delivered ? "Delivered" : "Not Delivered"
                    });

        var jobs = await list
        .Where(x => x.Job.JobId.Contains(request.keyword ?? ""))
        .OrderByDescending(x => x.Job.Id)
        .ProjectTo<JobDto>(_mapper.ConfigurationProvider)
        .ToListAsync();
        
        return jobs;
   }
}