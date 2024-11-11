using AutoMapper;
using BES.Application.Common.Interfaces;
using BES.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BES.Application.PurchaseOrderAggregate.Queries.GetAvailableJob;

public class GetLastPoNumber : IRequest<string>
{

}

public class GetLastPoNumberHandler : IRequestHandler<GetLastPoNumber, string>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetLastPoNumberHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<string> Handle(GetLastPoNumber request, CancellationToken cancellationToken)
    {
        Purchase? lastData = await _context.Purchases.OrderByDescending(x => x.Id).FirstOrDefaultAsync();
        string lastPoId = lastData == null ? "1" : (lastData.Id + 1).ToString();
        return lastPoId;
    }
}