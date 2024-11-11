using AutoMapper;
using AutoMapper.QueryableExtensions;
using BES.Application.Common.Interfaces;
using BES.Application.JobAggregate.Model;
using MediatR;
using System.Linq.Dynamic.Core;
using Microsoft.EntityFrameworkCore;
using BES.Application.JobAggregate.Models;

namespace BES.Application.JobAggregate.Queries.GetJobAssembliesByJob
{
    public class GetJobAssembliesByJob : IRequest<List<JobDto>>
    {
        public long JobId { get; set; }
    }

    public class GetJobAssembliesByJobHandler : IRequestHandler<GetJobAssembliesByJob, List<JobDto>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetJobAssembliesByJobHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<List<JobDto>> Handle(GetJobAssembliesByJob request, CancellationToken cancellationToken)
        {
            try {
                var list = (from job in _context.Jobs
                            join jobtype in _context.JobTypes on job.JobTypeId equals jobtype.Id
                            join client in _context.Clients on job.ClientId equals client.Id
                            where job.Deleted == null
                            && job.ParentJobNumber == request.JobId
                            select new JobVm
                            {
                                Job = job,
                                Client = client,
                                JobType = jobtype,
                                Status = job.Delivered ? "Delivered" : "Not Delivered"
                            });

                var jobs = await list
                .OrderByDescending(x => x.Job.JobNumber)
                .ProjectTo<JobDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

                return jobs;

            } catch(Exception ex) {
                throw ex;
            }
        }
    }
}
