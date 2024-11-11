using BES.Application.Common.Models;
using BES.Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace BES.Application.Common.Interfaces;

public interface IUserService
{
    Task<(Result Result, string UserId)> CreateUserAsync(UserAccount user, string password);
    Task<(Result Result, string UserId)> UpdateUserAsync(UserAccount user);
    Task CreateRolesAsync(string userId, List<string> roles);
    Task UpdateRolesAsync(string userId, List<string> roles);
    Task<List<string>> GetRolesByEmail(string Email);
    Task<string> GenerateResetPasswordToken(string Email);
    Task<PaginatedList<RoleModel>> GetRoles(string name,string sort,int skip,int take);
    Task<List<RoleModel>> GetAllRoles();
    Task<RoleModel> GetRoleById(string id);
    Task CreateRoleAsync(string name);
    Task UpdateRoleAsync(string id,string name);
    Task DeleteRoleAsync(string id);
    Task<IdentityResult> ResetPasswordAsync(string email, string tokenGenerated, string newPassword);
    
}
