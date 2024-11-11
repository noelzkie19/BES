using MediatR;
using BES.Application.Common.Interfaces;
using BES.Domain.Entities;
using BES.Application.Common.Exceptions;

namespace BES.Application.UserAggregate.Commands.UpdateChangePasswordRequired;
public class UpdateChangePasswordRequired : IRequest<int>
{
    public int Id { get; set; }
}

public class UpdateChangePasswordRequiredHandler : IRequestHandler<UpdateChangePasswordRequired, int>
{
    private readonly IApplicationDbContext _context;
    private readonly IUserService _userService;

    public UpdateChangePasswordRequiredHandler(IApplicationDbContext context, IUserService userService)
    {
        _context = context;
        _userService = userService;
    }

    public async Task<int> Handle(UpdateChangePasswordRequired request, CancellationToken cancellationToken)
    {
        var user = await _context.UserAccounts
                   .FindAsync(new object[] { request.Id }, cancellationToken);

        if (user == null) 
            throw new NotFoundException("User does not exists.");
        user.UpdateChangePasswordRequired(false);


        var (identityResult, userId) = await _userService.UpdateUserAsync(user);
        
        if(identityResult.Succeeded)
        {   

            _context.UserAccounts.Update(user);
            await _context.SaveChangesAsync(cancellationToken);
        }
        
        return user.Id;
    }
    
}
