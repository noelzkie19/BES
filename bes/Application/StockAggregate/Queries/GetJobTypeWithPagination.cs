using AutoMapper;
using AutoMapper.QueryableExtensions;
using BES.Application.Common.Interfaces;
using BES.Application.Common.Models;
using BES.Application.StockAggregate.Model;
using MediatR;
using BES.Application.Common.Mappings;

namespace BES.Application.StockAggregate.Queries.GetJobTypeWithPagination;

public class GetJobTypeWithPagination : IRequest<PaginatedList<JobTypeDto>>
{
    public int PageNumber { get; set; } = 1;
    public int PageSize { get; set; } = 10;
    public string? Keyword { get; set; }
}

public class GetJobTypeWithPaginationHandler : IRequestHandler<GetJobTypeWithPagination, PaginatedList<JobTypeDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetJobTypeWithPaginationHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<PaginatedList<JobTypeDto>> Handle(GetJobTypeWithPagination request, CancellationToken cancellationToken)
    {
        var JobType = await _context.JobTypes
               .OrderByDescending(x => x.Created)
               .ProjectTo<JobTypeDto>(_mapper.ConfigurationProvider)
               .PaginatedListAsync(request.PageNumber, request.PageSize);
        return JobType;
    }
}


