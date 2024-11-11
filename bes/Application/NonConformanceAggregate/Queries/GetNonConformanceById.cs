using AutoMapper;
using AutoMapper.QueryableExtensions;
using BES.Application.Common.Interfaces;
using BES.Application.Common.Models;
using MediatR;
using BES.Application.Common.Mappings;
using System.Linq.Dynamic.Core;
using Microsoft.EntityFrameworkCore;
using BES.Application.NonConformanceAggregate.Model;
using BES.Application.Common.Exceptions;

namespace BES.Application.NonConformanceAggregate.Queries.GetNonConformanceById;

public class GetNonConformanceById : IRequest<NonConformanceDto>
{
    public int Id { get; set; }
}

public class GetNonConformanceByIdHandler : IRequestHandler<GetNonConformanceById, NonConformanceDto>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetNonConformanceByIdHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<NonConformanceDto> Handle(GetNonConformanceById request, CancellationToken cancellationToken)
    {
        var list = (from nonConformance in _context.NonConformances
                        where nonConformance.Deleted == null
                        select new NonConformanceVm
                        {
                            NonConformance = nonConformance,
                            FilterJobNumber = nonConformance.JobNumber.ToString()
                        });

        var newList = await list
            .Where(d => d.NonConformance.Id == request.Id )
            .ProjectTo<NonConformanceDto>(_mapper.ConfigurationProvider)
            .FirstOrDefaultAsync();
            
        if (newList == null)
            throw new NotFoundException("Non-Conformance does not exists.");

        return newList;
    }
}


