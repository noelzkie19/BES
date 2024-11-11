
using BES.Application.Common.Models;
using BES.Infrastructure.Identity;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using BES.Application.Common.Interfaces;
using Application.Common.Interfaces;
using Microsoft.AspNetCore.WebUtilities;
using BES.Application.UserAggregate.Queries.GetUserByEmail;
using System.Text;

namespace BES.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AuthenticateController : ApiControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IAuthService _authService;
        private readonly IUserService _userService;

        private readonly IMailClientService _mailClientService;

        public AuthenticateController(
            UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager,
            IConfiguration configuration,
            IAuthService authService,
            IUserService userService,
            IMailClientService mailClientService)
        {
            _configuration = configuration;
            _userManager = userManager;
            _roleManager = roleManager;
            _authService = authService;
            _mailClientService = mailClientService;
            _userService = userService;

        }

        [HttpPost]
        [Route("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(model.Email);

                if(user == null)
                    return BadRequest(new { message = "User does not exist." });

                if (model.Email != "administrator@localhost.com") 
                {
                    var userData = await Mediator.Send(new GetUserByEmail {
                        Email = user.Email
                    });

                    if (userData == null)
                        return BadRequest(new { message = "User does not exist." });
                
                    if (!userData.IsActive)
                        return BadRequest(new { message = "User is Inactive." });
                }
               

                if (await _userManager.CheckPasswordAsync(user, model.Password))
                {
                    var userRoles = await _userManager.GetRolesAsync(user);

                    var claimsAuth = new List<Claim>
                    {
                        new Claim(ClaimTypes.NameIdentifier, user.UserName),
                        new Claim(ClaimTypes.Name, user.Email),
                        new Claim(JwtRegisteredClaimNames.Jti, user.Id),
                    };

                    foreach (var userRole in userRoles)
                    {
                        claimsAuth.Add(new Claim(ClaimTypes.Role, userRole));
                    }

                    var token = _authService.CreateToken(claimsAuth);
                    var refreshToken = _authService.GenerateRefreshToken();

                    _ = int.TryParse(_configuration["JWT:RefreshTokenValidityInDays"], out int refreshTokenValidityInDays);

                    user.RefreshToken = refreshToken;
                    user.RefreshTokenExpiryTime = DateTime.Now.AddDays(refreshTokenValidityInDays);

                    // Set claims identity
                    var identity = new ClaimsIdentity(claimsAuth);
                    HttpContext.User = new ClaimsPrincipal(identity);

                    return Ok(new
                    {
                        Token = new JwtSecurityTokenHandler().WriteToken(token),
                        RefreshToken = refreshToken,
                        Expiration = token.ValidTo
                    });
                } else {
                    return BadRequest(new { message = "Incorrect Password." });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("verify-token")]
        public async Task<IActionResult> VerifyToken([FromBody] LoginVerifyDto model)
        {
            var userName = _authService.GetNameByToken(model.ApiToken);
            var userRole = await _userService.GetRolesByEmail(userName);

            if (userName != "administrator@localhost.com")
            {
                var userData = await Mediator.Send(new GetUserByEmail
                {
                    Email = userName
                });
                userData.UserRoles = userRole;
                return Ok(userData);
            } 
            else 
            {
               var admin = await _userManager.FindByNameAsync(userName);
                
                return Ok(new
                {
                    Id = admin.Id,
                    UserName = admin.UserName,
                    Email = admin.Email,
                    UserRoles = userRole,
                    FirstName = "Administrator",
                    LastName = ""
                });
            }
        }

        [HttpPost]
        [Route("reset-password")]
        [AllowAnonymous]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDto model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            var bytes = WebEncoders.Base64UrlDecode(model.ResetPasswordToken);
            var code = Encoding.UTF8.GetString(bytes);
            if (user != null)
            {
                var resetPassResult = await _userManager.ResetPasswordAsync(user, code, model.Password);

                if (resetPassResult.Succeeded)
                {
                    var userRoles = await _userManager.GetRolesAsync(user);
                    var claimsAuth = new List<Claim>
                    {
                        new Claim(ClaimTypes.NameIdentifier, user.UserName),
                        new Claim(ClaimTypes.Name, user.UserName),
                        new Claim(JwtRegisteredClaimNames.Jti, user.Id),
                    };

                    foreach (var userRole in userRoles)
                    {
                        claimsAuth.Add(new Claim(ClaimTypes.Role, userRole));
                    }

                    var token = _authService.CreateToken(claimsAuth);
                    var refreshToken = _authService.GenerateRefreshToken();

                    _ = int.TryParse(_configuration["JWT:RefreshTokenValidityInDays"], out int refreshTokenValidityInDays);

                    user.RefreshToken = refreshToken;
                    user.RefreshTokenExpiryTime = DateTime.Now.AddDays(refreshTokenValidityInDays);

                    // Set claims identity
                    var identity = new ClaimsIdentity(claimsAuth);
                    HttpContext.User = new ClaimsPrincipal(identity);

                    return Ok(new
                    {
                        Token = new JwtSecurityTokenHandler().WriteToken(token),
                        RefreshToken = refreshToken,
                        Expiration = token.ValidTo
                    });
                }

            }

            return Unauthorized();
        }

        [HttpPost]
        [Route("change-password")]
        [AllowAnonymous]
        public async Task<IActionResult> ChangePassword([FromBody] LoginModel model)
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(model.Email);
                if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
                {
                    var tokenGenerated = await _userService.GenerateResetPasswordToken(model.Email);
                    var encodedToken  = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(tokenGenerated));
                    var bytes = WebEncoders.Base64UrlDecode(encodedToken);
                    var code = Encoding.UTF8.GetString(bytes);
                    var resetPassResult = await _userManager.ResetPasswordAsync(user, code, model.NewPassword);

                    
                    if (resetPassResult.Succeeded)
                    {
                        var userRoles = await _userManager.GetRolesAsync(user);
                        var claimsAuth = new List<Claim>
                    {
                        new Claim(ClaimTypes.NameIdentifier, user.UserName),
                        new Claim(ClaimTypes.Name, user.UserName),
                        new Claim(JwtRegisteredClaimNames.Jti, user.Id),
                    };

                        foreach (var userRole in userRoles)
                        {
                            claimsAuth.Add(new Claim(ClaimTypes.Role, userRole));
                        }

                        var token = _authService.CreateToken(claimsAuth);
                        var refreshToken = _authService.GenerateRefreshToken();

                        _ = int.TryParse(_configuration["JWT:RefreshTokenValidityInDays"], out int refreshTokenValidityInDays);

                        user.RefreshToken = refreshToken;
                        user.RefreshTokenExpiryTime = DateTime.Now.AddDays(refreshTokenValidityInDays);

                        // Set claims identity
                        var identity = new ClaimsIdentity(claimsAuth);
                        HttpContext.User = new ClaimsPrincipal(identity);

                        return Ok(new
                        {
                            Token = new JwtSecurityTokenHandler().WriteToken(token),
                            RefreshToken = refreshToken,
                            Expiration = token.ValidTo
                        });
                    }
                }
                return Unauthorized();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }


}