using AutoMapper;
using AutoMapper.QueryableExtensions;
using BES.Application.Common.Interfaces;
using BES.Application.JobAggregate.Model;
using BES.Application.Common.Models;
using MediatR;
using BES.Application.Common.Mappings;
using System.Linq.Dynamic.Core;
using BES.Application.JobAggregate.Models;

namespace BES.Application.JobAggregate.Queries.GetCompleteJobPagination;

public class GetCompleteJobPagination : IRequest<PaginatedList<JobDto>>
{
    public int Skip { get; set; } = 1;
    public int Take { get; set; } = 10;
    public string Sort { get; set; } = string.Empty;
    public string? Search { get; set; } = string.Empty;
    public string? Client { get; set; } = string.Empty;
    public string? Description { get; set; } = string.Empty;
    public string? JobId { get; set; } = string.Empty;
    public string? DrawingNumber { get; set; } = string.Empty;
    public string? JobType { get; set; } = string.Empty;
    public string? RevisionNumber { get; set; } = string.Empty;
    public string? OrderNumber { get; set; } = string.Empty;
    public string? Status { get; set; } = string.Empty;
    public DateTime? DueDate { get; set; }
    public string? Del { get; set; } = string.Empty;
}

public class GetCompleteJobPaginationHandler : IRequestHandler<GetCompleteJobPagination, PaginatedList<JobDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetCompleteJobPaginationHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    public async Task<PaginatedList<JobDto>> Handle(GetCompleteJobPagination request, CancellationToken cancellationToken)
    {
        try 
        {
            var DueDate = "";

            if (request.DueDate != null)
            {
                request.DueDate = request.DueDate?.AddDays(1);
                DueDate = request.DueDate.Value.ToString("MMM dd yyyy");
            }

            var list = (from job in _context.Jobs
                        join jobtype in _context.JobTypes on job.JobTypeId equals jobtype.Id
                        join client in _context.Clients on job.ClientId equals client.Id
                        join quote in _context.Quotes on job.QuoteNumberSource equals quote.Id
                        into qt from qtD in qt.DefaultIfEmpty()
                        where job.Deleted == null
                        && job.ParentJobNumber == null
                        && (job.QuantityDelivered >= job.Quantity && job.Quantity > 0)
                        select new JobVm
                        {
                            Job = job,
                            Client = client,
                            JobType = jobtype,
                            Quote = qtD,
                            Status = job.Delivered ? "Delivered" : "Not Delivered",
                            DueDateString = job.DueDate == null ? "" : job.DueDate.Value.ToString()
                        });

            var jobs = await list
            .Where(item => string.IsNullOrEmpty(request.Search) 
                    || item.Job.Description.StartsWith(request.Search)
                    || item.Client.Name.StartsWith(request.Search)
                    || item.Job.DrawingNumber.StartsWith(request.Search)
                    || item.Job.Description.StartsWith(request.Search)
                    || item.Job.RevisionNumber.StartsWith(request.Search)
                    || item.Job.JobId.StartsWith(request.Search)
                    || item.Job.OrderNumber.StartsWith(request.Search))
            .Where(item => string.IsNullOrEmpty(request.JobId) || item.Job.JobId.StartsWith(request.JobId))
            .Where(item => string.IsNullOrEmpty(request.Description) || item.Job.Description.StartsWith(request.Description))
            .Where(item => string.IsNullOrEmpty(request.Client) || item.Client.Name.StartsWith(request.Client))
            .Where(item => string.IsNullOrEmpty(request.DrawingNumber) || item.Job.DrawingNumber.StartsWith(request.DrawingNumber))
            .Where(item => string.IsNullOrEmpty(request.JobType) || item.JobType.Description.StartsWith(request.JobType))
            .Where(item => string.IsNullOrEmpty(request.RevisionNumber) || item.Job.RevisionNumber.StartsWith(request.RevisionNumber))
            .Where(item => string.IsNullOrEmpty(request.Status) || item.Status.Equals(request.Status))
            .Where(item => string.IsNullOrEmpty(request.OrderNumber) || item.Job.OrderNumber.StartsWith(request.OrderNumber))
            .Where(item => string.IsNullOrEmpty(DueDate) || item.DueDateString.Contains(DueDate))
            .Where(item => request.Del == "unchecked" ? item.Job.Delivered == false : true)
            .Where(item => request.Del == "checked" ? item.Job.Delivered == true : true)
            .OrderBy(request.Sort)
            .ProjectTo<JobDto>(_mapper.ConfigurationProvider)
            .PaginatedListGridAsync(request.Skip, request.Take);

            foreach(var job in jobs.Items) 
            {
                job.ExpandedItemCnt = _context.Jobs
                .Where(x => x.ParentJobNumber == job.Id && x.ParentJobNumber != null)
                .ProjectTo<JobSubassemblyDto>(_mapper.ConfigurationProvider)
                .ToList()
                .Count();
            }

            return jobs;

        } 
        catch (Exception ex)
        {
            throw ex;
        }
      
    }
}