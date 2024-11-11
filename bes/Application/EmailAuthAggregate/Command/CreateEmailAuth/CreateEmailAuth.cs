using MediatR;
using BES.Application.Common.Interfaces;
using BES.Domain.Entities;

namespace BES.Application.EmailAuthAggregate.Commands.CreateEmailAuth;
public class CreateEmailAuth : IRequest<int>
{
    public string Email { get; set; } = null!;
    public string Password { get; set; } = null!;
}

public class CreateEmailAuthHandler : IRequestHandler<CreateEmailAuth, int>
{
    private readonly IApplicationDbContext _context;
    private readonly IAuthService _authService;

    public CreateEmailAuthHandler(IApplicationDbContext context, IAuthService authService)
    {
        _context = context;
        _authService = authService;
    }

    public async Task<int> Handle(CreateEmailAuth request, CancellationToken cancellationToken)
    {
        var hashPassword = _authService.EncryptPassword(request.Password);
        var email = _context.EmailAuths.FirstOrDefault(x => x.Email == request.Email);
        var id = 0;
        if (email != null) 
        {
            email.UpdatePassword(hashPassword.Item1, hashPassword.Item2, hashPassword.Item3);
            id = email.Id;
            _context.EmailAuths.Update(email);
        } 
        else 
        {
            var newAuth = new EmailAuth(request.Email, hashPassword.Item1, hashPassword.Item2, hashPassword.Item3);
            _context.EmailAuths.Add(newAuth);
            id = newAuth.Id;
        }

      
        await _context.SaveChangesAsync(cancellationToken);
        return id;

    }
}
