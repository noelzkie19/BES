using AutoMapper;
using AutoMapper.QueryableExtensions;
using BES.Application.Common.Interfaces;
using BES.Application.JobAggregate.Model;
using BES.Application.Common.Models;
using MediatR;
using BES.Application.Common.Mappings;
using System.Linq.Dynamic.Core;
using BES.Application.JobAggregate.Models;

namespace BES.Application.JobAggregate.Queries.GetJobReportPrintDetails;
public class GetJobReportPrintDetails : IRequest<PaginatedList<JobDto>>
{
    public string SortBy { get; set; } = string.Empty;
    public int Client { get; set; }
    // public DateTime DateFrom { get; set; }
    // public DateTime DateTo { get; set; }
    public int JobType { get; set; }

    public int Skip { get; set; }
    public int Take { get; set; }
    public bool ToBeInvoice { get; set; }
}

public class GetJobReportPrintDetailsHandler : IRequestHandler<GetJobReportPrintDetails, PaginatedList<JobDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    public GetJobReportPrintDetailsHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    public async Task<PaginatedList<JobDto>> Handle(GetJobReportPrintDetails request, CancellationToken cancellationToken)
    {
        try 
        {
            var list = (from job in _context.Jobs
                        join jobtype in _context.JobTypes on job.JobTypeId equals jobtype.Id
                        join client in _context.Clients on job.ClientId equals client.Id

                        where job.Deleted == null
                        && job.ParentJobNumber == null
                        //  where job.Created.Date >= request.DateFrom.Date &&  job.Created.Date <= request.DateTo.Date
                        select new JobVm
                        {
                            Job = job,
                            Client = client,
                            JobType = jobtype,
                            Status = job.Delivered ? "Delivered" : "Not Delivered"
                        });
            var jobs = await list
            .Where(item => request.Client == 0 || item.Client.Id == request.Client)
            .Where(item => request.JobType == 0 || item.JobType.Id == request.JobType)
            .Where(item => item.Job.ToBeInvoiced == request.ToBeInvoice
                &&  (request.ToBeInvoice ? string.IsNullOrEmpty(item.Job.InvoiceNumber) : true))
            .OrderBy(request.SortBy)
            .ProjectTo<JobDto>(_mapper.ConfigurationProvider)
            .PaginatedListGridAsync(request.Skip, request.Take);

             return jobs;

        } 
        catch (Exception ex) 
        {
            throw ex;
        }
      
    }
}