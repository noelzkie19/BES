using MediatR;
using BES.Application.Common.Interfaces;
using BES.Domain.Entities;
using BES.Application.Common.Exceptions;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Text;
using System.Security.Cryptography;

namespace BES.Application.RoleAggregate.Commands.CreateRole;
public class CreateRole : IRequest<bool>
{
    public string Name { get; set; } = null!;
}

public class CreateRoleHandler : IRequestHandler<CreateRole, bool>
{
    private readonly IUserService _userService;

    public CreateRoleHandler(IApplicationDbContext context, IIdentityService identityService, IUserService userService)
    {
        _userService = userService;
    }

    public async Task<bool> Handle(CreateRole request, CancellationToken cancellationToken)
    {
        await _userService.CreateRoleAsync(request.Name);
        
        return true;
    }
}
