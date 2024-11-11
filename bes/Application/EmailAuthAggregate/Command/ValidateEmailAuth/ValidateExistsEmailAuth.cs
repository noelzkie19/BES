using MediatR;
using BES.Application.Common.Interfaces;
using BES.Domain.Entities;

namespace BES.Application.EmailAuthAggregate.Commands.ValidateExistsEmailAuth;
public class ValidateExistsEmailAuth : IRequest<bool>
{
    public string Email { get; set; } = null!;
}

public class ValidateExistsEmailAuthHandler : IRequestHandler<ValidateExistsEmailAuth, bool>
{
    private readonly IApplicationDbContext _context;
    private readonly IAuthService _authService;

    public ValidateExistsEmailAuthHandler(IApplicationDbContext context, IAuthService authService)
    {
        _context = context;
        _authService = authService;
    }

    public async Task<bool> Handle(ValidateExistsEmailAuth request, CancellationToken cancellationToken)
    {
        var authEmail = _context.EmailAuths.FirstOrDefault(x => x.Email == request.Email);
        if (authEmail == null)
            return false;
        else return true;
    }
}
