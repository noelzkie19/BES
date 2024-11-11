
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace BES.Application.Common.Interfaces;

public interface IAuthService
{
    string GenerateRefreshToken();
    string GetNameByToken(string token);
    string GetEmailByToken(string token);
    JwtSecurityToken CreateToken(List<Claim> authClaims);
    Tuple<byte[], byte[], byte[]> EncryptPassword(string password);
    string DecryptPassword(byte[] encryptedPassword, byte[] key, byte[] iv);
}
