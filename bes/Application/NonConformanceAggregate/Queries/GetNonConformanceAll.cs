using AutoMapper;
using AutoMapper.QueryableExtensions;
using BES.Application.Common.Interfaces;
using BES.Application.NonConformanceAggregate.Model;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BES.Application.NonConformanceAggregate.Queries.GetNonConformanceAll;

public class GetNonConformanceAll : IRequest<IList<NonConformanceDto>>
{
}

public class GetNonConformanceAllHandler : IRequestHandler<GetNonConformanceAll, IList<NonConformanceDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    public GetNonConformanceAllHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    public async Task<IList<NonConformanceDto>> Handle(GetNonConformanceAll request, CancellationToken cancellationToken)
    {
        var list = (from nonConformance in _context.NonConformances
                    where nonConformance.Deleted == null
                    select new NonConformanceVm
                    {
                        NonConformance = nonConformance,
                        FilterJobNumber = nonConformance.JobNumber.ToString()
                    });

        var nonConformanceList = await list
        .ProjectTo<NonConformanceDto>(_mapper.ConfigurationProvider).ToListAsync();

        return nonConformanceList;
    }
}