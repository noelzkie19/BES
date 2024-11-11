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

namespace BES.Application.RoleAggregate.Queries;

public class GetRoles : IRequest<PaginatedList<RoleModel>>
{
    public string Sort { get; set; } = string.Empty;
    public string? Filter { get; set; }
    public int Skip { get; set; } = 0;
    public int Take { get; set; } = 10;
    public string? Query { get; set; }
    public string Name { get; set; } = string.Empty;
}

public class GetRolesQueryHandler : IRequestHandler<GetRoles, PaginatedList<RoleModel>>
{
    private readonly IUserService _userService;
    private readonly IMapper _mapper;

    public GetRolesQueryHandler(IUserService userService, IMapper mapper)
    {
        _userService = userService;
        _mapper =  mapper;
    }

    public async Task<PaginatedList<RoleModel>> Handle(GetRoles request, CancellationToken cancellationToken)
    {
        var roles = await _userService.GetRoles(request.Name,request.Sort,request.Skip,request.Take);
        return roles;
    }
}

