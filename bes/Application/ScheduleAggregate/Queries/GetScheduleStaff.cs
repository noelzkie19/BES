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
using BES.Application.Common.Extensions;

namespace BES.Application.ScheduleAggregate.Queries.GetScheduleStaff;

public class GetScheduleStaff : IRequest<PaginatedList<ScheduleJobDto>>
{
    public int? StaffId { get; set; }
    public int Skip { get; set; } = 0;
    public int Take { get; set; } = 10;
    public string SortBy { get; set; } = string.Empty;
    public DateTime? DueDate { get; set; }
    public string Search { get; set; } = string.Empty;
    public string? JobId { get; set; }
    public string? Description { get; set; }
    public string? Client { get; set; }
}

public class GetSchedulAllocatedJobJobHandler : IRequestHandler<GetScheduleStaff, PaginatedList<ScheduleJobDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetSchedulAllocatedJobJobHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    public async Task<PaginatedList<ScheduleJobDto>> Handle(GetScheduleStaff request, CancellationToken cancellationToken)
    {
        try
        {
            var DueDate = "";

            if (request.DueDate != null) {
                request.DueDate = request.DueDate?.AddDays(1);
                DueDate = request.DueDate.ToDateString();
            }

            var list = (from sched in _context.Schedules
                        join jjob in _context.Jobs on sched.JobId equals jjob.Id
                        into jbtemp
                        from job in jbtemp.DefaultIfEmpty()

                        join client in _context.Clients on job.ClientId equals client.Id
                        into cnttemp
                        from clnt in cnttemp.DefaultIfEmpty()

                        where job.Deleted == null
                        && job.DateScheduled != null
                        && job.ParentJobNumber == null
                        // && ops.ToList().Count() > 0
                        select new ScheduleJobVm
                        {
                            Job = job,
                            Client = clnt,
                            Schedule = sched,
                            DueDateString = job.DueDate == null ? "" : job.DueDate.Value.ToString()
                        });

            var jobs = await list
            .OrderBy(request.SortBy)
            .Where(item => string.IsNullOrEmpty(request.JobId) || item.Job.JobId.StartsWith(request.JobId))
            .Where(item => string.IsNullOrEmpty(request.Description) || item.Job.Description.StartsWith(request.Description))
            .Where(item => string.IsNullOrEmpty(request.Client) || item.Client.Name.StartsWith(request.Client))
            .Where(item => string.IsNullOrEmpty(DueDate) || item.DueDateString.Contains(DueDate))
            .Where(x => x.Job.Operations.Where(a => a.StaffId == request.StaffId).Count() > 0)
            .ProjectTo<ScheduleJobDto>(_mapper.ConfigurationProvider)
            .PaginatedListGridAsync(request.Skip, request.Take);

            foreach (var data in jobs.Items)
            {
                data.Operations = data.Operations.Where(x => x.StaffId == request.StaffId).ToList();
            }


            return jobs;
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }
}