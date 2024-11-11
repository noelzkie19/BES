using AutoMapper;
using AutoMapper.QueryableExtensions;
using BES.Application.Common.Interfaces;
using MediatR;
using System.Linq.Dynamic.Core;
using Microsoft.EntityFrameworkCore;
using BES.Application.PurchaseOrderAggregate.Models;

namespace BES.Application.PurchaseOrderAggregate.Queries.GetAvailableJob;

public class GetAvailableJob : IRequest<List<JobDto>>
{
    public string? keyword { get; set; }
}

public class GetAvailableJobHandler : IRequestHandler<GetAvailableJob, List<JobDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetAvailableJobHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    public async Task<List<JobDto>> Handle(GetAvailableJob request, CancellationToken cancellationToken)
    {

        IQueryable<PurchaseJobVm> list = (from job in _context.Jobs
                    join jobtype in _context.JobTypes on job.JobTypeId equals jobtype.Id
                    join client in _context.Clients on job.ClientId equals client.Id
                    where job.Deleted == null
                    && job.ParentJobNumber == null 
                    && !job.Delivered 

                    select new PurchaseJobVm
                    {
                        Job = job,
                        Client = client
                    });

        var jobs = await list
        .Where(x => x.Job.JobId.Contains(request.keyword ?? ""))
        .OrderByDescending(x => x.Job.Id)
        .Take(1000) // limit to 1000
        .ProjectTo<JobDto>(_mapper.ConfigurationProvider)
        .ToListAsync();

        return jobs;
    }
}