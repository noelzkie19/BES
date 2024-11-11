using AutoMapper;
using AutoMapper.QueryableExtensions;
using BES.Application.Common.Interfaces;
using BES.Application.JobAggregate.Model;
using BES.Application.Common.Models;
using MediatR;
using BES.Application.Common.Mappings;
using System.Linq.Dynamic.Core;
using BES.Application.JobAggregate.Models;
using BES.Application.ScheduleAggregate.Model;

namespace BES.Application.ScheduleAggregate.Queries.GetScheduleUnallocatedJob;

public class GetScheduleUnallocatedJob : IRequest<PaginatedList<ScheduleJobDto>>
{
    public int Skip { get; set; } = 0;
    public int Take { get; set; } = 10;
    public string SortBy { get; set; }
    public string? Search { get; set; } = string.Empty;
    public string? JobId { get; set; }
    public string? Description { get; set; }
    public string? Client { get; set; }
}

public class GetScheduleUnallocatedJobHandler : IRequestHandler<GetScheduleUnallocatedJob, PaginatedList<ScheduleJobDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetScheduleUnallocatedJobHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    public async Task<PaginatedList<ScheduleJobDto>> Handle(GetScheduleUnallocatedJob request, CancellationToken cancellationToken)
    {
        try
        {
            var list = (from job in _context.Jobs
                        join client in _context.Clients on job.ClientId equals client.Id
                        into cnttemp
                        from clnt in cnttemp.DefaultIfEmpty()

                        where job.Deleted == null
                        && job.DateScheduled == null
                        && job.ParentJobNumber == null
                        && job.CompletedBy != ""
                        select new ScheduleJobVm
                        {
                            Job = job,
                            Client = clnt
                        });

            var jobs = await list
                .OrderBy(request.SortBy)
                .Where(item => string.IsNullOrEmpty(request.JobId) || item.Job.JobId.StartsWith(request.JobId))
                .Where(item => string.IsNullOrEmpty(request.Description) || item.Job.Description.StartsWith(request.Description))
                .Where(item => string.IsNullOrEmpty(request.Client) || item.Client.Name.StartsWith(request.Client))
                .ProjectTo<ScheduleJobDto>(_mapper.ConfigurationProvider)
                .PaginatedListGridAsync(request.Skip, request.Take);

            return jobs;
        }
        catch (Exception ex) 
        {
            throw ex;
        }
        
    }
}