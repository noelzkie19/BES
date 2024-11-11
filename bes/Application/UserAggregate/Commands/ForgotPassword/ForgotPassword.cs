using System.Security.Cryptography;
using System.Text;
using Application.Common.Interfaces;
using Application.Common.Models.Email;
using BES.Application.Common.Interfaces;
using MediatR;
using System.Web;
using Microsoft.Extensions.Configuration;
using System.Net;
using System.Text.Encodings.Web;
using Microsoft.AspNetCore.WebUtilities;
using BES.Application.Common.Exceptions;

namespace Application.UserAggregate.Commands.ForgotPassword;

public class ForgotPassword : IRequest<bool>
{
    public string Email { get ; set; } = string.Empty;
}

public class ForgotPasswordHandler : IRequestHandler<ForgotPassword, bool>
{
    private readonly IApplicationDbContext _context;
    private readonly IMailClientService _mailClientService; 
    private readonly IUserService _userService;
    private readonly IConfiguration _configuration;
    public ForgotPasswordHandler(IApplicationDbContext context,
           IMailClientService mailClientService,
           IUserService userService,
           IConfiguration configuration)
    {
        _context = context;
        _mailClientService = mailClientService;
        _userService = userService;
        _configuration = configuration;
    }

    public async Task<bool> Handle(ForgotPassword request, CancellationToken cancellationToken)
    {
        try 
        {   
            var user = _context.UserAccounts.Where(e => e.Email == request.Email).FirstOrDefault();

            if (user == null) 
                throw new NotFoundException("User does not exists.");

            var recipients = new List<string>();
            var token = await _userService.GenerateResetPasswordToken(request.Email);
            var encodedToken  = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));
            var callBackUrl = $"{_configuration["ResetPasswordLink"]}?email={request.Email}&token={encodedToken}";
            recipients.Add(request.Email);
            var mail = new SenderMailModel(request.Email, recipients, "Reset Password", "reset-password", null);
            mail.Body = mail.Body.Replace("{RESET_PASSWORD_URL}", callBackUrl);
           
            await _mailClientService.SendEmailAsync(mail);
            return true;
        } 
        catch (Exception ex) 
        {
            throw ex;
        }
       
    }
}

