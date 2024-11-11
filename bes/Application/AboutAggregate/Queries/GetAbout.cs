using AutoMapper;
using AutoMapper.QueryableExtensions;
using BES.Application.Common.Interfaces;
using MediatR;
using BES.Application.AboutAggregate.Models;
using Microsoft.EntityFrameworkCore;
using BES.Application.Common.Exceptions;

namespace BES.Application.AboutAggregate.Queries.GetAbout;

public class GetAbout : IRequest<AboutDto>
{
}

public class GetAboutHandler : IRequestHandler<GetAbout, AboutDto>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetAboutHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<AboutDto> Handle(GetAbout request, CancellationToken cancellationToken)
    {
        var about = await _context.Abouts
               .ProjectTo<AboutDto>(_mapper.ConfigurationProvider)
               .FirstOrDefaultAsync();
        if (about is null)
         throw new NotFoundException("About does not exists.");

        return about;
    }
}


