

using System.Text;
using Microsoft.AspNetCore.Http;

namespace Application.Common.Models.Email;
public class SenderMailModel
{
    public string UserName { get; set; }
    public List<string> Recipients { get; set; }
    public List<string>? Ccs { get; set; }
    public List<string>? Bccs { get; set; }
    public string Subject { get; set; }
    public string Body { get; set; }
    public IFormFile? Attachment { get; set; }
    public List<string>? Base64Ids { get; set; }
    public List<IFormFile>? Attachments { get; set; }
    public string? EmailFrom { get; set; }
    public string? Password { get; set; }
    public SenderMailModel(string userName, List<string> recipients, string subject, string template, 
        IFormFile? attachment, string? messageBody = null, List<string>? bccs = null, List<string>? ccs = null,
        List<string>? base64Ids = null, List<IFormFile>? attachments = null)
    {

        UserName = userName;
        Recipients = recipients;
        Subject = subject;
        Attachment = attachment;
        Body = messageBody != null ? messageBody : GetTemplateBody(template);
        Bccs = bccs;
        Ccs = ccs;
        Base64Ids = base64Ids;
        Attachments = attachments;

    }

    public void SetSmtpCredentials(string emailFrom, string password)
    {
        Password = password;
        EmailFrom = emailFrom;
    }

    private static string GetTemplateBody(string template)
    {
        var filePath = Path.Combine(Directory.GetCurrentDirectory(), $"email-templates/{template}.html");

        return File.ReadAllText(filePath, Encoding.UTF8);
    }

}