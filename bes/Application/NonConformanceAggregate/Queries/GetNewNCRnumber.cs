using AutoMapper;
using AutoMapper.QueryableExtensions;
using BES.Application.Common.Interfaces;
using MediatR;
using System.Linq.Dynamic.Core;
using Microsoft.EntityFrameworkCore;

namespace BES.Application.NonConformanceAggregate.Queries.GetNewNCRnumber;

public class GetNewNCRnumber : IRequest<string>
{
    
}

public class GetNewNCRnumberHandler : IRequestHandler<GetNewNCRnumber, string>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetNewNCRnumberHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    public async Task<string> Handle(GetNewNCRnumber request, CancellationToken cancellationToken)
    {
        var yr = DateTime.UtcNow.Date.Year;
        var lastData = await _context.NcrNumbers.FirstOrDefaultAsync();
        var lastncrNum = lastData == null ? 0 : lastData.LastNcrNumber;
        var NewNcrNum = lastncrNum == 0 ? "0000001" : (lastncrNum + 1).ToString().PadLeft(7, '0');
        var formatNewNCRnumber = $"NCR-{yr}-{NewNcrNum}";
        return formatNewNCRnumber;
    }
}