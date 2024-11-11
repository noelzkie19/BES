using AutoMapper;
using AutoMapper.QueryableExtensions;
using BES.Application.Common.Interfaces;
using BES.Application.Common.Models;
using MediatR;
using BES.Application.Common.Mappings;
using System.Linq.Dynamic.Core;
using Microsoft.EntityFrameworkCore;
using BES.Application.JobAggregate.Model;

namespace BES.Application.JobAggregate.Queries.GetJobOperationByJobId;

public class GetJobOperationByJobId : IRequest<List<OperationDto>>
{
    public int JobId { get; set; }
    public int JobIdSource { get; set; }
}

public class GetJobOperationByJobIdHandler : IRequestHandler<GetJobOperationByJobId, List<OperationDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetJobOperationByJobIdHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<List<OperationDto>> Handle(GetJobOperationByJobId request, CancellationToken cancellationToken)
    {
        try
        {
            var operation = await _context.Operations
            .Where(ops => ops.JobId == request.JobId || ops.JobId == request.JobIdSource)
            .OrderByDescending(x => x.Id)
            .ProjectTo<OperationDto>(_mapper.ConfigurationProvider)
            .ToListAsync();

            return operation;
        }
        catch(Exception ex)
        {
            throw ex;
        }
        
    }
}
  

