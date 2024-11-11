using MediatR;
using BES.Application.Common.Interfaces;
using BES.Domain.Entities;
using BES.Application.Common.Exceptions;
using Microsoft.AspNetCore.WebUtilities;
using System.Text;

namespace BES.Application.UserAggregate.Commands.UpdateUser;
public class UpdateUser : IRequest<int>
{
    public int Id { get; set; }
    public string UserName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public bool IsActive { get; set; } = false;
    public bool IsResetPasswordRequired { get; set; } = false;
    public List<string> UserRoles { get; set; } = null!;
    public string? NewPassword { get; set; } = string.Empty;
}

public class UpdateUserHandler : IRequestHandler<UpdateUser, int>
{
    private readonly IApplicationDbContext _context;
    private readonly IUserService _userService;

    public UpdateUserHandler(IApplicationDbContext context, IUserService userService)
    {
        _context = context;
        _userService = userService;
    }

    public async Task<int> Handle(UpdateUser request, CancellationToken cancellationToken)
    {
        var user = await _context.UserAccounts
                   .FindAsync(new object[] { request.Id }, cancellationToken);

        if (user == null) 
            throw new NotFoundException("User does not exists.");
        if (request.UserRoles.Count < 1)
                throw new ThrowErrorException("User No Roles");
        user.UpdateUserAccount(request.FirstName, request.LastName, request.IsActive, request.IsResetPasswordRequired);


        var (identityResult, userId) = await _userService.UpdateUserAsync(user);
        
        if(identityResult.Succeeded)
        {   
            var isExists = _context.UserAccounts.Any(e => (e.Email == request.Email || e.UserName == request.UserName) && e.Id != request.Id && e.IsActive);
            if (isExists)
                throw new AlreadyExistsException("User already exists");

            _context.UserAccounts.Update(user);
            await _userService.UpdateRolesAsync(userId,request.UserRoles);
            await _context.SaveChangesAsync(cancellationToken);
        }

        if (!String.IsNullOrWhiteSpace(request.NewPassword))
        {
            var tokenGenerated = await _userService.GenerateResetPasswordToken(user.Email);
            await _userService.ResetPasswordAsync(user.Email, tokenGenerated, request.NewPassword);
        }


        return user.Id;
    }
    
}
