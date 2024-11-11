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

public class GetRoleById : IRequest<RoleModel>
{
    public string Id { get; set; } = string.Empty;
}

public class GetRoleByIdQueryHandler : IRequestHandler<GetRoleById, RoleModel>
{
    private readonly IUserService _userService;

    public GetRoleByIdQueryHandler(IUserService userService, IMapper mapper)
    {
        _userService = userService;
    }

    public async Task<RoleModel> Handle(GetRoleById request, CancellationToken cancellationToken)
    {
        var roles = await _userService.GetRoleById(request.Id);
        return roles;
    }
}

