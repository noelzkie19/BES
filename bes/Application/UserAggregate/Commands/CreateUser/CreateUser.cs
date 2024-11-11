using MediatR;
using BES.Application.Common.Interfaces;
using BES.Domain.Entities;
using BES.Application.Common.Exceptions;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Text;
using System.Security.Cryptography;
using Application.Common.Models.Email;
using Application.Common.Interfaces;
using BES.Domain.Events;

namespace BES.Application.UserAggregate.Commands.CreateUser;
public class CreateUser : IRequest<int>
{
    public string UserName { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;
    public bool IsActive { get; set; } = false;
    public bool IsResetPasswordRequired { get; set; } = false;
    public List<string> UserRoles { get; set; } = new List<string>();
}

public class CreateUserHandler : IRequestHandler<CreateUser, int>
{
    private readonly IApplicationDbContext _context;
    private readonly IUserService _userService;
    private readonly IMailClientService _mailClientService; 



    public CreateUserHandler(IApplicationDbContext context, IIdentityService identityService, IUserService userService
        ,IMailClientService mailClientService)
    {
        _context = context;
        _userService = userService;
        _mailClientService = mailClientService;

    }

    public async Task<int> Handle(CreateUser request, CancellationToken cancellationToken)
    {
         if (request.UserRoles.Count < 1)
                throw new ThrowErrorException("User No Roles");
        byte[] salt = RandomNumberGenerator.GetBytes(16);
        var initialPassword = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                        password: request.Email,
                        salt: salt,
                        prf: KeyDerivationPrf.HMACSHA256,
                        iterationCount: 100000,
                        numBytesRequested: 32));


        var user = new UserAccount(request.UserName, request.Email, request.FirstName, request.LastName, request.IsActive, request.IsResetPasswordRequired, initialPassword);
       
        var (identityResult, userId) = await _userService.CreateUserAsync(user, initialPassword);
        
        if(identityResult.Succeeded)
        {
            var isExists = _context.UserAccounts.Any(e => e.Email == request.Email || e.UserName == request.UserName);
            if (isExists)
                throw new AlreadyExistsException("User already exists");
            try
            {
                // var recipients = new List<string>();
                // recipients.Add(request.Email);
                // var mail = new SenderMailModel(request.Email, recipients, "Welcom to BES", "welcome-message", null);
                // mail.Body = mail.Body.Replace("{INITIAL_PASSWORD}", initialPassword);
                // await _mailClientService.SendEmailAsync(mail);

                var result =  _context.UserAccounts.Add(user);
                await _userService.CreateRolesAsync(userId,request.UserRoles);

                user.DomainEvents.Add(new EmailUserEvent(new EmailUserEventArgs
                {
                    Email = request.Email,
                    InitialPassword = initialPassword
                }));

                await _context.SaveChangesAsync(cancellationToken);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        } 
        else 
        {
            if (identityResult.Errors.Length > 0) 
            {
                throw new Exception(identityResult.Errors[0]);
            }
            else 
            {
                throw new Exception("User Invalid Please try another.");
            }
        }
       
        return user.Id;
    }
}
