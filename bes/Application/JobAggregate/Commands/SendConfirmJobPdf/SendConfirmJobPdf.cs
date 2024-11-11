using Application.Common.Interfaces;
using Application.Common.Models.Email;
using BES.Application.Common.Exceptions;
using BES.Application.Common.Interfaces;
using BES.Domain.Entities;
using BES.Domain.Enums;
using BES.Domain.Events;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace BES.Application.JobAggregate.Commands.SendConfirmJobPdf;

public class SendConfirmJobPdf : IRequest<bool>
{
    public IFormFile Attachment { get; set; }
    public string SendTo { get; set; }
    public string UserName { get; set; }
    public string JobId { get; set; }
    public int Id { get; set; }
    public int ClientId { get; set; }
}


public class SendConfirmJobPdfHandler : IRequestHandler<SendConfirmJobPdf, bool>
{
    IMailClientService _emailService;
    IApplicationDbContext _context;
    IFileStorageService _fileStorageService;
    public SendConfirmJobPdfHandler(IMailClientService emailService, IApplicationDbContext context, IFileStorageService fileStorageService)
    {
        _emailService = emailService;
        _context = context;
        _fileStorageService = fileStorageService;
    }

    public async Task<bool> Handle(SendConfirmJobPdf request, CancellationToken cancellationToken)
    {
        try
        {
            var recipients = new List<string>();
            recipients.Add(request.SendTo);
            var mail = new SenderMailModel(request.UserName, recipients, "Job Confirmation: " + request.JobId, "job-confirmation", request.Attachment);
            await _emailService.SendEmailAsync(mail);

            var job = await _context.Jobs.FindAsync(new object[] { request.Id }, cancellationToken);
            if (job == null)
            {
                throw new NotFoundException(nameof(Job), request.Id);
            }


            var filesStorage =  await _fileStorageService.UploadFiles(request.Attachment);
            _context.FileStorages.Add(filesStorage);
            await _context.SaveChangesAsync(cancellationToken);

            var fileStorage = await _context.FileStorages
            .FindAsync(new object[] { filesStorage.Id }, cancellationToken);


            job.DomainEvents.Add(new ClientEmailHistoryEvent(new ClientEmailHistoryEventArgs
            {
                ClientId = request.ClientId,
                EmailDate = DateTime.UtcNow,
                EmailType = EmailTypes.JobConfirmEmail,
                EmailedBy = request.UserName,
                ReferenceNumber = job.JobId,
                FileStorageId = filesStorage.Id
            }));
            await _context.SaveChangesAsync(cancellationToken);

            return true;
        }
        catch (Exception ex)
        {
            throw ex;
        }

    }
}
