using Application.Common.Interfaces;
using Application.Common.Models.Email;
using BES.Application.Common.Exceptions;
using BES.Application.Common.Interfaces;
using BES.Domain.Entities;
using BES.Domain.Enums;
using BES.Domain.Events;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace BES.Application.QuoteAggregate.Commands.SendEmailQuotePdf;

public class SendEmailQuotePdf : IRequest<bool>
{
    public IFormFile Attachment { get; set; }
    public int Id { get; set; }
    public int ClientId { get; set; }
    public string SendTo { get; set; } = string.Empty;
    public string UserName { get; set; } = string.Empty;
    public string ClientName { get; set; } = string.Empty;
    public string QuoteId { get; set; } = string.Empty;
}

public class SendEmailQuotePdfHandler : IRequestHandler<SendEmailQuotePdf, bool>
{
    IMailClientService _emailService;
    private readonly IApplicationDbContext _context;

    IFileStorageService _fileStorageService;

    public SendEmailQuotePdfHandler(IMailClientService emailService,IApplicationDbContext context, IFileStorageService fileStorageService)
    {
        _emailService = emailService;
        _context = context;
        _fileStorageService = fileStorageService;
    }
    public async Task<bool> Handle(SendEmailQuotePdf request, CancellationToken cancellationToken)
    {
        try
        {
            var recipients = new List<string>();
            recipients.Add(request.SendTo);
            var mail = new SenderMailModel(request.UserName, recipients, "Quotation: " + request.QuoteId, "quote-email", request.Attachment);
            mail.Body = mail.Body.Replace("{CLIENT_NAME}", request.ClientName);
            await _emailService.SendEmailAsync(mail);
            var quote = await _context.Quotes
             .FindAsync(new object[] { request.Id }, cancellationToken);
            if (quote == null)
            {
                throw new NotFoundException(nameof(Quote), request.Id);
            }

            var filesStorage =  await _fileStorageService.UploadFiles(request.Attachment);
            _context.FileStorages.Add(filesStorage);
            await _context.SaveChangesAsync(cancellationToken);

            var fileStorage = await _context.FileStorages
            .FindAsync(new object[] { filesStorage.Id }, cancellationToken);

            quote.DomainEvents.Add(new ClientEmailHistoryEvent(new ClientEmailHistoryEventArgs
            {
                ClientId = request.ClientId,
                EmailDate = DateTime.UtcNow,
                EmailType = EmailTypes.QuoteEmail,
                EmailedBy = request.UserName,
                ReferenceNumber = request.QuoteId,
                FileStorageId = filesStorage.Id
            }));
            await _context.SaveChangesAsync(cancellationToken);
            
            quote.PrintQuote("Completed");
            return true;
        }
        catch (System.Exception)
        {
            throw;
        }
    }

}