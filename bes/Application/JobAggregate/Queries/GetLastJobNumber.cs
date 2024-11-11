using AutoMapper;
using AutoMapper.QueryableExtensions;
using BES.Application.Common.Interfaces;
using MediatR;
using System.Linq.Dynamic.Core;
using Microsoft.EntityFrameworkCore;
using BES.Application.PurchaseOrderAggregate.Models;

namespace BES.Application.JobAggregate.Queries.GetLastJobNumber;

public class GetLastJobNumber : IRequest<long>
{
    
}

public class GetLastJobNumberHandler : IRequestHandler<GetLastJobNumber, long>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetLastJobNumberHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    public async Task<long> Handle(GetLastJobNumber request, CancellationToken cancellationToken)
    {
        var lastData = await _context.Jobs.Where(d=> !d.JobId.Contains("M-")).OrderByDescending(x => x.JobNumber).FirstOrDefaultAsync();
        long lastJobNumber = lastData == null ? 1 : (lastData.JobNumber + 1);
        return lastJobNumber;
    }
}