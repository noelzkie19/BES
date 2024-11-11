using AutoMapper;
using AutoMapper.QueryableExtensions;
using BES.Application.Common.Interfaces;
using BES.Application.Common.Models;
using BES.Application.AccountAggregate.Models;
using MediatR;
using BES.Application.Common.Mappings;

namespace BES.Application.AccountAggregate.Queries.GetAccountWithPagination;

public class GetAccountWithPagination : IRequest<PaginatedList<AccountDto>>
{
    public int PageNumber { get; set; } = 1;
    public int PageSize { get; set; } = 10;
    public string? Keyword { get; set; }
}

public class GetAccountWithPaginationHandler : IRequestHandler<GetAccountWithPagination, PaginatedList<AccountDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetAccountWithPaginationHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<PaginatedList<AccountDto>> Handle(GetAccountWithPagination request, CancellationToken cancellationToken)
    {
        var Account = await _context.Accounts
               .OrderByDescending(x => x.Created)
               .ProjectTo<AccountDto>(_mapper.ConfigurationProvider)
               .PaginatedListAsync(request.PageNumber, request.PageSize);
        return Account;
    }
}


