using Application.Common.Interfaces;
using Application.Common.Models.Email;
using BES.Application.Common.Exceptions;
using BES.Application.Common.Interfaces;
using BES.Application.Common.Models;
using BES.Domain.Events;
using MediatR;

public class EmailUserEventHandler : INotificationHandler<DomainEventNotification<EmailUserEvent>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMailClientService _mailClientService; 
    public EmailUserEventHandler(IApplicationDbContext context, IMailClientService mailClientService)
    {
        _context = context;
        _mailClientService = mailClientService;
    }

    public async Task Handle(DomainEventNotification<EmailUserEvent> notification, CancellationToken cancellationToken)
    {
        var email = notification.DomainEvent.EmailUserEventArg.Email;
        var initialPassword = notification.DomainEvent.EmailUserEventArg.InitialPassword;
        var recipients = new List<string>();
        recipients.Add(email);
        var mail = new SenderMailModel(email, recipients, "Welcom to BES", "welcome-message", null);
        mail.Body = mail.Body.Replace("{INITIAL_PASSWORD}", initialPassword);
        await _mailClientService.SendEmailAsync(mail);

        await _context.SaveChangesAsync(cancellationToken);
    }
}