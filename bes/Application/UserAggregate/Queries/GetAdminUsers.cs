using AutoMapper;
using AutoMapper.QueryableExtensions;
using BES.Application.Common.Interfaces;
using BES.Application.Common.Models;
using MediatR;
using BES.Application.Common.Mappings;
using BES.Application.ClientAggregate.Model;
using Microsoft.EntityFrameworkCore;
using BES.Application.UserAggregate.Models;
using Microsoft.AspNetCore.Identity;
using System.Linq.Dynamic.Core;

namespace BES.Application.UserAggregate.Queries.GetAdminUsers;

public class GetAdminUsers : IRequest<List<UserAccountDto>>
{
    public string? Keyword { get; set; }
}

public class GetAdminUsersHandler : IRequestHandler<GetAdminUsers, List<UserAccountDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly IUserService _userService;

    public GetAdminUsersHandler(IApplicationDbContext context, IMapper mapper, IIdentityService identityService, IUserService userService)
    {
        _context = context;
        _mapper = mapper;
        _userService = userService;
    }

    public async Task<List<UserAccountDto>> Handle(GetAdminUsers request, CancellationToken cancellationToken)
    {
        var userList = await _context.UserAccounts
               .Where(item => string.IsNullOrEmpty(request.Keyword)
                || item.UserName.Contains(request.Keyword)
                || item.FirstName.Contains(request.Keyword)
                || item.LastName.Contains(request.Keyword))
               .Where(item => item.IsActive)
               .OrderBy(x => x.UserName)
               .ProjectTo<UserAccountDto>(_mapper.ConfigurationProvider)
               .ToListAsync();
        var newData = new List<UserAccountDto>();
        foreach (var user in userList)
        {
            user.UserRoles = await _userService.GetRolesByEmail(user.Email);
            
            foreach(var role in user.UserRoles){
                if(role == "Administrator") {
                    newData.Add(new UserAccountDto
                    {
                        Id = user.Id,
                        UserName = user.UserName,
                        Email = user.Email,
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        IsActive = user.IsActive,
                        UserRoles = user.UserRoles,
                    });
                }
            }
        }

        return newData;
    }
}


