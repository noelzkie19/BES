using AutoMapper;
using AutoMapper.QueryableExtensions;
using BES.Application.Common.Interfaces;
using BES.Application.NonConformanceAggregate.Model;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;

namespace BES.Application.NonConformanceAggregate.Queries.GetNonConformancePrint;

public class GetNonConformancePrint : IRequest<IList<NonConformanceDto>>
{
    public string SortBy { get; set; } = string.Empty;
    public string NcrNumber { get; set; } = string.Empty;
    public DateTime DateFrom { get; set; }
    public DateTime DateTo { get; set; }
}
public class GetNonConformancePrintHandler : IRequestHandler<GetNonConformancePrint, IList<NonConformanceDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    public GetNonConformancePrintHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    
    public async Task<IList<NonConformanceDto>> Handle(GetNonConformancePrint request, CancellationToken cancellationToken)
    {
        var list = (from nonConformance in _context.NonConformances
                    join userAction in _context.UserAccounts on nonConformance.Action equals userAction.Id
                    into userActioninto from userActiontemp in userActioninto.DefaultIfEmpty()

                    // join correctAction in _context.UserAccounts on nonConformance.ReviewOfCorrectiveAction equals correctAction.Id
                    // into correctActioninto from correctActiontemp in correctActioninto.DefaultIfEmpty()

                    join ncrCleared in _context.UserAccounts on nonConformance.NcrClearedBy equals ncrCleared.Id
                    into ncrClearedinto from ncrClearedtemp in ncrClearedinto.DefaultIfEmpty()

                    join under in _context.UserAccounts on nonConformance.UnderTakenBy equals under.Id
                    into underinto from undertemp in underinto.DefaultIfEmpty()

                    where nonConformance.Deleted == null
                    
                    select new NonConformanceVm
                    {
                        NonConformance = nonConformance,
                        FilterJobNumber = nonConformance.JobNumber.ToString(),
                        ReportAction = userActiontemp.FirstName +  ' ' + userActiontemp.LastName,
                        ReportReviewOfCorrectiveAction = nonConformance.ReviewOfCorrectiveAction,
                        ReportNcrClearedBy   = ncrClearedtemp.FirstName +  ' ' + ncrClearedtemp.LastName,
                        ReportUnderTakenBy = undertemp.FirstName +  ' ' + undertemp.LastName
                    });

        var nonConformanceList = await list
        .Where( item => string.IsNullOrEmpty(request.NcrNumber) || item.NonConformance.NcrNumber.StartsWith(request.NcrNumber))
        // .Where( item => item.NonConformance.Created.Date >= request.DateFrom.Date && item.NonConformance.Created.Date <= request.DateTo.Date  )
        // .OrderBy(request.SortBy)
        .ProjectTo<NonConformanceDto>(_mapper.ConfigurationProvider).ToListAsync();

        return nonConformanceList;
    }
}