using MediatR;
using BES.Application.Common.Interfaces;
using BES.Domain.Entities;

namespace BES.Application.AccountAggregate.Commands.CreateAccount;
public class CreateAccount : IRequest<int>
{
    public string Number { get; set; } = null!;
    public string Name { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Type { get; set; } = null!;
}

public class CreateAccountHandler : IRequestHandler<CreateAccount, int>
{
    private readonly IApplicationDbContext _context;

    public CreateAccountHandler(IApplicationDbContext context, IIdentityService identityService)
    {
        _context = context;
    }

    public async Task<int> Handle(CreateAccount request, CancellationToken cancellationToken)
    {
        var newAccount = new Account(request.Number, request.Name, request.Email, request.Type);

        _context.Accounts.Add(newAccount);
        await _context.SaveChangesAsync(cancellationToken);
        return newAccount.Id;

    }
}
