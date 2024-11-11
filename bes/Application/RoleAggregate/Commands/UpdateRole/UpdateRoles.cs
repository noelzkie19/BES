using MediatR;
using BES.Application.Common.Interfaces;
using BES.Domain.Entities;
using BES.Application.Common.Exceptions;

namespace BES.Application.RoleAggregate.Commands.UpdateRole;
public class UpdateRole : IRequest<string>
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
}

public class UpdateRoleHandler : IRequestHandler<UpdateRole, string>
{
    private readonly IUserService _userService;

    public UpdateRoleHandler(IUserService userService)
    {
        _userService = userService;
    }

    public async Task<string> Handle(UpdateRole request, CancellationToken cancellationToken)
    {
        await _userService.UpdateRoleAsync(request.Id, request.Name);
        return request.Id;
    }
    
}
