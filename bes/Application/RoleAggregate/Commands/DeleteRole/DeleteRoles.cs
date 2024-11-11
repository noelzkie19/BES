using BES.Application.Common.Exceptions;
using BES.Application.Common.Interfaces;
using BES.Domain.Entities;
using MediatR;

namespace BES.Application.RoleAggregate.Commands.DeleteRole;

public class DeleteRole : IRequest
{
    public string Id { get; set; }
}


public class DeleteRoleHandler : IRequestHandler<DeleteRole>
{
    private readonly IUserService _userService;
    public DeleteRoleHandler(IUserService userService)
    {
        _userService = userService;
    }

    public async Task<Unit> Handle(DeleteRole request, CancellationToken cancellationToken)
    {
        await _userService.DeleteRoleAsync(request.Id);
        return Unit.Value;
    }
}
