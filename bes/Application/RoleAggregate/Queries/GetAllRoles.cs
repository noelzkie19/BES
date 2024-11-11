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

public class GetAllRoles : IRequest<List<RoleModel>>
{
    public string Keyword { get; set; } = string.Empty;
}

public class GetAllRolesQueryHandler : IRequestHandler<GetAllRoles, List<RoleModel>>
{
    private readonly IUserService _userService;

    public GetAllRolesQueryHandler(IUserService userService, IMapper mapper)
    {
        _userService = userService;
    }

    public async Task<List<RoleModel>> Handle(GetAllRoles request, CancellationToken cancellationToken)
    {
        var roles = await _userService.GetAllRoles();
        return roles;
    }
}

