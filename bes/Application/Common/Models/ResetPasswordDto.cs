
namespace BES.Application.Common.Models;
public class ResetPasswordDto
{
    public string Email { get; set; } = string.Empty;
    public string ResetPasswordToken { get; set; }  = string.Empty;
    public string Password { get; set; } = string.Empty;
}