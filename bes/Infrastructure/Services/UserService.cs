using System.Text;
using BES.Application.Common.Exceptions;
using BES.Application.Common.Interfaces;
using BES.Application.Common.Models;
using BES.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace BES.Infrastructure.Identity;

public class UserService : IUserService
{
    private readonly IApplicationDbContext _context;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly IConfiguration _configuration;
    public UserService(IApplicationDbContext context, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration)
    {
        _context = context;
        _userManager = userManager;
        _configuration = configuration;
        _roleManager = roleManager;
    }

    public async Task<(Result Result, string UserId)> CreateUserAsync(UserAccount user, string password)
    {
        var newuser = new ApplicationUser
        {
            UserName = user.UserName,
            Email = user.Email
        };
        var findUser = await _userManager.FindByEmailAsync(user.Email);
        if(findUser != null) 
            return (Result.Success() , findUser.Id.ToString());

        var result = await _userManager.CreateAsync(newuser, password);
        return (result.ToApplicationResult(), newuser.Id);
    }

    public async Task<(Result Result, string UserId)> UpdateUserAsync(UserAccount user)
    {
        var findUser = await _userManager.FindByEmailAsync(user.Email);
        findUser.Email = user.Email;
        findUser.UserName = user.UserName;

        await _userManager.UpdateAsync(findUser); 
        return (Result.Success() ,findUser.Id.ToString());
    }    

    public async Task CreateRolesAsync(string userId, List<string> roles)
    {
        var user = await _userManager.FindByIdAsync(userId);
        var userRoles = await _userManager.GetRolesAsync(user);

        roles.Except(userRoles);
        await _userManager.AddToRolesAsync(user, roles);
    }  

    public async Task UpdateRolesAsync(string userId, List<string> roles)
    {
        var user = await _userManager.FindByIdAsync(userId);
        var userRoles = await _userManager.GetRolesAsync(user);

        var excludedRoles = userRoles.Except(roles);
        roles.Except(userRoles);
        
        foreach (var userRole in excludedRoles)
        {
            await _userManager.RemoveFromRoleAsync(user, userRole);
        }
        
        await _userManager.AddToRolesAsync(user, roles);
    } 

    public async Task<List<string>> GetRolesByEmail(string Email) 
    {
        var user = await _userManager.FindByEmailAsync(Email);
        if (user != null) 
        {
          var userRoles = await _userManager.GetRolesAsync(user);
          return userRoles.ToList();
        } else {
          return new List<string>();
        }
     

    } 

    public async Task<string> GenerateResetPasswordToken(string Email)
    {
        var user = await _userManager.FindByEmailAsync(Email);
        string token = "";
        if(user != null){
           token = await _userManager.GeneratePasswordResetTokenAsync(user);
        }

        return token;
    }

    public async Task<PaginatedList<RoleModel>> GetRoles(string name,string sort,int skip,int take) 
    {
        var roles = await _roleManager.Roles.Select(s=>new { ID = s.Id, Name = s.Name }).ToListAsync();
        List<RoleModel> userRoles = new List<RoleModel>();
        var displayId = 1;
        foreach(var role in roles){
            var userRole = new RoleModel() { Id = role.ID , Name = role.Name , DisplayId = displayId };
            displayId += 1;
            userRoles.Add(userRole);
        }
        var allroles = userRoles.Where(x => x.Name.StartsWith(name,System.StringComparison.CurrentCultureIgnoreCase));
        if(sort == "name asc"){
            allroles = allroles.OrderBy(e => e.Name);
        }
        if(sort == "name desc"){
            allroles = allroles.OrderByDescending(e => e.Name);
        }
        if(sort == "id desc"){
            allroles = allroles.OrderByDescending(e => e.Id);
        }
        // return allroles.ToList();
         if(skip >= allroles.Count()) skip = 0;
        return new PaginatedList<RoleModel>(
            allroles.Skip(skip).ToList(),
            allroles.Count(),
            roles.Count(),
            allroles.Count()
        );
    } 

    public async Task<List<RoleModel>> GetAllRoles() 
    {
        var roles = await _roleManager.Roles.Select(s=>new { ID = s.Id, Name = s.Name }).ToListAsync();
        List<RoleModel> userRoles = new List<RoleModel>();

        foreach(var role in roles){
            var userRole = new RoleModel() { Id = role.ID , Name = role.Name};
            userRoles.Add(userRole);
        }

        return userRoles;
    } 

    public async Task CreateRoleAsync(string name)
    {
        var administratorRole = new IdentityRole(name);
        var roles = await _roleManager.Roles.Select(s=>new { ID = s.Id, Name = s.Name }).ToListAsync();
        List<RoleModel> userRoles = new List<RoleModel>();

        foreach(var role in roles){
            var userRole = new RoleModel() { Id = role.ID , Name = role.Name};
            userRoles.Add(userRole);
        }
        var allroles = userRoles.Where(x => x.Name.Equals(name,System.StringComparison.CurrentCultureIgnoreCase)).ToList();
        if(allroles.Count >= 1){
            throw new AlreadyExistsException("User Role exists");
        }
        if (_roleManager.Roles.All(r => r.Name != administratorRole.Name))
        {
            await _roleManager.CreateAsync(administratorRole);
        }
    }  

    public async Task UpdateRoleAsync(string id,string name)
    {
        var roles = await _roleManager.Roles.Select(s=>new { ID = s.Id, Name = s.Name }).ToListAsync();
        foreach(var element in roles){
            var userRole = new RoleModel() { Id = element.ID , Name = element.Name};
            if (element.ID != id && element.Name.Equals(name,System.StringComparison.CurrentCultureIgnoreCase)){
                throw new AlreadyExistsException("User Role exists");
            }
        }
        var role = await _roleManager.FindByIdAsync(id);
        role.Name = name;
        role.NormalizedName = name;
        await _roleManager.UpdateAsync(role);
    }  

    public async Task DeleteRoleAsync(string id)
    {
        var role = await _roleManager.FindByIdAsync(id);
        await _roleManager.DeleteAsync(role);
    }  

    public async Task<RoleModel> GetRoleById(string id) 
    {
        var role = await _roleManager.Roles
        .Where(x => x.Id == id)
        .Select(s=>new { ID = s.Id, Name = s.Name })
        .FirstOrDefaultAsync();

        var result = new RoleModel() { 
            Id = role.ID , 
            Name = role.Name
        };

        return result;
    } 
     public async Task<IdentityResult> ResetPasswordAsync(string email, string tokenGenerated, string newPassword) 
    {
        var user = await _userManager.FindByEmailAsync(email);
        // var tokenGenerated = await _userService.GenerateResetPasswordToken(user.Email);
        var encodedToken  = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(tokenGenerated));
        var bytes = WebEncoders.Base64UrlDecode(encodedToken);
        var code = Encoding.UTF8.GetString(bytes);
        var resetPassResult = await _userManager.ResetPasswordAsync(user, code, newPassword);

        return resetPassResult;
    } 





}
