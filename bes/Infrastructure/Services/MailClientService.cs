using System.Net;
using System.Net.Mail;
using System.Net.Mime;
using System.Text;
using Application.Common.Interfaces;
using Application.Common.Models.Email;
using MailKit;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Configuration;
using MimeKit;
using MimeKit.Text;
using BES.Domain.Helper.Extensions;

namespace Infrastructure.Services;
public class MailClientService : IMailClientService
{
    private IConfigurationRoot _configuration;
    private string HOST;
    private string USER_NAME;
    private string PASSWORD;
    private int PORT;
    private string FROM_EMAIL;

    public MailClientService(IConfiguration configRoot)
    {
        _configuration = (IConfigurationRoot)configRoot;
        HOST = _configuration["SmtpClient:Host"];
        USER_NAME = _configuration["SmtpClient:UserName"];
        PASSWORD = _configuration["SmtpClient:Password"];
        PORT = Convert.ToInt32(_configuration["SmtpClient:Port"]);
        FROM_EMAIL = _configuration["SmtpClient:FromEmail"];
    }

    public async Task SendEmailAsync(SenderMailModel senderMail)
    {
        try
        {
            string? UserName = senderMail.EmailFrom == null ? USER_NAME : senderMail.EmailFrom;
            // string? UserPassword = senderMail.EmailFrom == null ? PASSWORD : senderMail.Password;
            string? UserPassword = "";
            var mail = new MimeMessage()
            {
                Subject = senderMail.Subject
            };
            mail.From.Add(MailboxAddress.Parse(UserName));
            var content =  senderMail.Body.ContentAttachmentLinkSignature();
            var builder = new BodyBuilder
            {
                HtmlBody = content.Item2
            };

            foreach (string recipient in senderMail.Recipients)
            {
                mail.To.Add(MailboxAddress.Parse(recipient));
            }
            if (senderMail.Bccs != null)
            {
                foreach (string bcc in senderMail.Bccs)
                {
                    mail.Bcc.Add(MailboxAddress.Parse(bcc));
                }
            }
            if (senderMail.Ccs != null)
            {
               foreach (string cc in senderMail.Ccs)
                {
                    mail.Cc.Add(MailboxAddress.Parse(cc));
                }
            }
            if (senderMail != null && senderMail.Attachments != null) 
            {
                foreach (var Attachment in senderMail.Attachments)
                {
                    using (var ms = new MemoryStream())
                    {
                        Attachment.CopyTo(ms);
                        var fileBytes = ms.ToArray();
                        builder.Attachments.Add(Attachment.FileName, fileBytes, MimeKit.ContentType.Parse(MediaTypeNames.Application.Pdf));
                    }
                }
            }
            mail.Headers.Add("X-MC-Auto-Format", "1");

            // Linked Resource image
            foreach (var a in content.Item1)
            {
                builder.LinkedResources.Add(a);
            }
            mail.Body = builder.ToMessageBody();
           
            using (var client = new MailKit.Net.Smtp.SmtpClient(new ProtocolLogger("smtp.log")))
            {
                client.ServerCertificateValidationCallback = (s, c, h, e) => true;
                client.Connect(HOST, PORT, SecureSocketOptions.Auto);
                
                // client.Authenticate(UserName, UserPassword);
                await client.SendAsync(mail);
                client.Disconnect(true);
            }
        }
        catch (Exception ex) 
        {
            throw new Exception(ex.Message) ;
        }
        

    }
}