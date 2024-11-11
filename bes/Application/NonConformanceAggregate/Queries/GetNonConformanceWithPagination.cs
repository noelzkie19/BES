using AutoMapper;
using AutoMapper.QueryableExtensions;
using BES.Application.Common.Interfaces;
using BES.Application.Common.Models;
using MediatR;
using BES.Application.Common.Mappings;
using BES.Application.ClientAggregate.Model;
using System.Linq.Dynamic.Core;
using BES.Application.NonConformanceAggregate.Model;

namespace BES.Application.NonConformanceAggregate.Queries.GetNonConformanceWithPagination;

public class GetNonConformanceWithPagination : IRequest<PaginatedList<NonConformanceDto>>
{
    public int Skip { get; set; } = 1;
    public int Take { get; set; } = 10;
    public string Sort { get; set; } = string.Empty;
    public string? ClientNcrNumber { get; set; } = string.Empty;
    public string? JobNumber { get; set; } = string.Empty;
    public string? NcrNumber { get; set; } = string.Empty;
    public string? Note { get; set; } = string.Empty;
    public string? RecordedBy { get; set; } = string.Empty;
    public string? ClientName { get; set; } = string.Empty;
    public string? DisplayJobId {get; set; } = string.Empty;
    public string? AdvanceSearch { get; set; } = string.Empty;
}

public class GetNonConformanceWithPaginationHandler : IRequestHandler<GetNonConformanceWithPagination, PaginatedList<NonConformanceDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetNonConformanceWithPaginationHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<PaginatedList<NonConformanceDto>> Handle(GetNonConformanceWithPagination request, CancellationToken cancellationToken)
    {
        try 
        {

             var list = (from nonConformance in _context.NonConformances
                        join job in _context.Jobs on nonConformance.LinkTo equals job.JobId
                        into jobapp from jjob in jobapp.DefaultIfEmpty()
                        join client in _context.Clients on jjob.ClientId equals client.Id
                        into clientapp from capp in clientapp.DefaultIfEmpty()

                        where nonConformance.Deleted == null

                        select new NonConformanceVm
                        {
                            NonConformance = nonConformance,
                            FilterJobNumber = nonConformance.JobNumber.ToString(),
                            Client = capp,
                            DisplayJobId = jjob.JobId
                        });

            var nonConformanceList = await list
            .Where(item => string.IsNullOrEmpty(request.AdvanceSearch) 
                || item.NonConformance.ClientNcrNumber.StartsWith(request.AdvanceSearch)
                || item.FilterJobNumber.StartsWith(request.AdvanceSearch)
                || item.NonConformance.NcrNumber.StartsWith(request.AdvanceSearch)
                || item.NonConformance.Note.StartsWith(request.AdvanceSearch)
                || item.NonConformance.RecordedBy.StartsWith(request.AdvanceSearch)
                || item.Client.Name.StartsWith(request.AdvanceSearch)
                || item.DisplayJobId.StartsWith(request.AdvanceSearch))
            .Where(item => string.IsNullOrEmpty(request.ClientNcrNumber) || item.NonConformance.ClientNcrNumber.StartsWith(request.ClientNcrNumber))
            .Where(item => string.IsNullOrEmpty(request.JobNumber) || item.FilterJobNumber.StartsWith(request.JobNumber))
            .Where(item => string.IsNullOrEmpty(request.NcrNumber) || item.NonConformance.NcrNumber.StartsWith(request.NcrNumber))
            .Where(item => string.IsNullOrEmpty(request.Note) || item.NonConformance.Note.StartsWith(request.Note))
            .Where(item => string.IsNullOrEmpty(request.RecordedBy) || item.NonConformance.RecordedBy.StartsWith(request.RecordedBy))
            .Where(item => string.IsNullOrEmpty(request.ClientName) || item.Client.Name.StartsWith(request.ClientName))
            .Where(item => string.IsNullOrEmpty(request.DisplayJobId) || item.DisplayJobId.StartsWith(request.DisplayJobId))
            .OrderBy(request.Sort)
            .ProjectTo<NonConformanceDto>(_mapper.ConfigurationProvider)
            .PaginatedListGridAsync(request.Skip, request.Take);

            return nonConformanceList;
        }
        catch (Exception ex)
        {
            throw ex;
        }
       
    }
}


