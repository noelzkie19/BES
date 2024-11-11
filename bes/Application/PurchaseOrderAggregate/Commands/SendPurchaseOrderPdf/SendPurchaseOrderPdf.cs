using Application.Common.Interfaces;
using Application.Common.Models.Email;
using BES.Application.Common.Exceptions;
using BES.Application.Common.Interfaces;
using BES.Domain.Entities;
using BES.Domain.Enums;
using BES.Domain.Events;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace BES.Application.PurchaseOrderAggregate.Commands.SendPurchaseOrderPdf;

public class SendPurchaseOrderPdf : IRequest<bool>
{
    public IFormFile Attachment { get; set; }
    public string? FromEmail { get; set; }
    public string SendTo { get; set; }
    public string UserName { get; set; }
    public string PONumber { get; set; }
    public int Id { get; set; }
    public string SupplierName { get; set; }
    public string? MessageBody { get; set; }
    public string Subject { get; set; }
    public string? Bccs { get; set; }
    public string? Ccs { get; set; }
    public string? Base64Ids { get; set; }
    public List<IFormFile>? Attachments { get; set; }
    
}

public class SendPurchaseOrderPdfHandler : IRequestHandler<SendPurchaseOrderPdf, bool>
{
    IMailClientService _emailService;
    IApplicationDbContext _context;
    IFileStorageService _fileStorageService;
    IAuthService _authService;
    public SendPurchaseOrderPdfHandler(IMailClientService emailService, IApplicationDbContext context, IFileStorageService fileStorageService, IAuthService authService)
    {
        _emailService = emailService;
        _context = context;
        _fileStorageService = fileStorageService;
        _authService = authService;
    }

    public async Task<bool> Handle(SendPurchaseOrderPdf request, CancellationToken cancellationToken)
    {
        try 
        {
            var recipients = new List<string>();
            var bccs = new List<string>();
            var ccs = new List<string>();
            var base64Ids = new List<string>();
            recipients = request.SendTo.Split(';').ToList();
            if (request.Bccs != null)
                bccs = request.Bccs.Split(';').ToList();

            if (request.Ccs != null)
                ccs = request.Ccs.Split(';').ToList();

            if (request.Base64Ids != null)
                base64Ids = request.Base64Ids.Split(';').ToList();

            var mail = new SenderMailModel(request.UserName, recipients, request.Subject, "purchase-order", request.Attachment, request.MessageBody, bccs, ccs, base64Ids, request.Attachments);
            if (request.MessageBody == null) {
                mail.Body = mail.Body.Replace("{SUPPLIER_NAME}", request.SupplierName);
            }
            
            // Check database store smtp setup
            if (request.FromEmail != null)
            {
                EmailAuth? authEmail = _context.EmailAuths.FirstOrDefault(x => x.Email == request.FromEmail);
                if (authEmail == null)
                {
                    authEmail = _context.EmailAuths.FirstOrDefault();
                }

                if (authEmail != null)
                {
                    string password = _authService.DecryptPassword(authEmail.EncryptPassword, authEmail.Key, authEmail.InitVector);
                    mail.SetSmtpCredentials(authEmail.Email, password);
                }
                else
                {
                    throw new Exception("No Setup found.");
                }
            }           

            await _emailService.SendEmailAsync(mail);

            
            var filesStorage =  await _fileStorageService.UploadFiles(request.Attachment);
            _context.FileStorages.Add(filesStorage);
            await _context.SaveChangesAsync(cancellationToken);

            var fileStorage = await _context.FileStorages
            .FindAsync(new object[] { filesStorage.Id }, cancellationToken);

            if (request.Id > 0)
            {
                var purchase = await _context.Purchases
                .FindAsync(new object[] { request.Id }, cancellationToken);
                if (purchase == null)
                {
                    throw new NotFoundException(nameof(Purchase), request.Id);
                }
                purchase.DomainEvents.Add(new SupplierEmailHistoryEvent(new SupplierEmailHistoryEventArgs
                {
                    SupplierId = purchase.SupplierId,
                    EmailDate = DateTime.UtcNow,
                    EmailType = EmailTypes.PurchaseOrder,
                    EmailedBy = request.UserName,
                    ReferenceNumber = request.PONumber,
                    FileStorageId = fileStorage.Id,
                    ContentBody = mail.Body
                }));
            }

            await _context.SaveChangesAsync(cancellationToken);
            return true;
        }
        catch (Exception ex)
        {
            throw ex;
        }
      
    }
}
