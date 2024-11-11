
using Application.Common.Models.Email;

namespace Application.Common.Interfaces;
public interface IMailClientService
{
     public Task SendEmailAsync(SenderMailModel email);
}