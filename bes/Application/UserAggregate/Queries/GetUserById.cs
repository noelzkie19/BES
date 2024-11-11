using AutoMapper;
using AutoMapper.QueryableExtensions;
using BES.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using BES.Application.UserAggregate.Models;
using System.Linq.Dynamic.Core;

namespace BES.Application.UserAggregate.Queries.GetUserById;

public class GetUserById : IRequest<UserAccountDto>
{
    public int Id { get; set; }
}

public class GetUserByIdHandler : IRequestHandler<GetUserById, UserAccountDto>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly IUserService _userService;

    public GetUserByIdHandler(IApplicationDbContext context, IMapper mapper, IIdentityService identityService,IUserService userService)
    {
        _context = context;
        _mapper = mapper;
        _userService = userService;
    }

    public async Task<UserAccountDto> Handle(GetUserById request, CancellationToken cancellationToken)
    {
        try 
        {
            var user = await _context.UserAccounts
                              .Where(acc => acc.Id   == request.Id)
                              .ProjectTo<UserAccountDto>(_mapper.ConfigurationProvider)
                              .FirstOrDefaultAsync();
            //
            user.UserRoles = await _userService.GetRolesByEmail(user.Email);
            // Map<UserAccountDto>()
            return user;
        } 
        catch (Exception ex) 
        {
            throw ex;
        }
     
    }
}


