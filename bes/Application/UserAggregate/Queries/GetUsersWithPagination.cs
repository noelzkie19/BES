using AutoMapper;
using AutoMapper.QueryableExtensions;
using BES.Application.Common.Interfaces;
using BES.Application.Common.Models;
using MediatR;
using BES.Application.Common.Mappings;
using BES.Application.ClientAggregate.Model;
using Microsoft.EntityFrameworkCore;
using BES.Application.UserAggregate.Models;
using Microsoft.AspNetCore.Identity;
using System.Linq.Dynamic.Core;

namespace BES.Application.UserAggregate.Queries;

public class GetUsersWithPagination : IRequest<PaginatedList<UserAccountDto>>
{
    public int Skip { get; set; } = 0;
    public int Take { get; set; } = 10;
    public string Sort { get; set; } = string.Empty;
    public string? Filter { get; set; }
    public string? Query { get; set; }
    public string UserName { get; set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string UserRoleDisplay { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public bool? IsActive { get; set; }
    public string? Email { get; set; } = string.Empty;
    
}

public class GetUsersWithPaginationHandler : IRequestHandler<GetUsersWithPagination, PaginatedList<UserAccountDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly IUserService _userService;

    public GetUsersWithPaginationHandler(IApplicationDbContext context, IMapper mapper, IIdentityService identityService, IUserService userService)
    {
        _context = context;
        _mapper = mapper;
        _userService = userService;
    }

    public async Task<PaginatedList<UserAccountDto>> Handle(GetUsersWithPagination request, CancellationToken cancellationToken)
    {
        try 
        {
        var sort = request.Sort.Contains("status") ? request.Sort.Replace("status", "isactive") : request.Sort;
                if(request.Sort.StartsWith("userRoleDisplay")){
                    sort = "id asc";
                }

                request.IsActive = request.Status.ToLower().Equals("active");

                var userList = await _context.UserAccounts
                        .Where($"UserName.startsWith(@0) and FirstName.startsWith(@1) and LastName.startsWith(@2) and Email.startsWith(@3)",
                        request.UserName, request.FirstName, request.LastName, request.Email == null ? "" : request.Email)
                    .Where(item => string.IsNullOrEmpty(request.Status)
                        || item.IsActive == request.IsActive)
                    .OrderBy(sort)
                    .ProjectTo<UserAccountDto>(_mapper.ConfigurationProvider)
                    .ToListAsync();
                //    .PaginatedListGridSkipOnlyAsync(request.Skip);
                var newData = new List<UserAccountDto>();
                foreach (var user in userList)
                {
                    user.UserRoles = await _userService.GetRolesByEmail(user.Email);
                    for (var role = 0; role < user.UserRoles.Count; role++)
                    {
                        if (user.UserRoles[role].ToString().StartsWith(request.UserRoleDisplay,System.StringComparison.CurrentCultureIgnoreCase))
                        {
                            newData.Add(new UserAccountDto
                            {
                                Id = user.Id,
                                UserName = user.UserName,
                                Email = user.Email,
                                FirstName = user.FirstName,
                                LastName = user.LastName,
                                IsActive = user.IsActive,
                                UserRoles = user.UserRoles,
                            });
                        }

                    }
                }

                var resultData = newData.DistinctBy(p => new { p.Email});

                var totalCount = userList.Count;
                if(request.UserRoleDisplay != ""){
                    totalCount = resultData.Count();
                }
                if(request.Sort == "userRoleDisplay asc"){
                    resultData  = resultData.OrderBy(e => e.UserRoleDisplay);
                }
                if(request.Sort == "userRoleDisplay desc"){
                    resultData  = resultData.OrderByDescending(e => e.UserRoleDisplay);
                }
                
                if(request.Skip >= totalCount) request.Skip = 0;
                return new PaginatedList<UserAccountDto>(
                        resultData.Skip(request.Skip).Take(request.Take).ToList(),
                        totalCount,
                        userList.Count,
                        totalCount
                );
        } catch (Exception ex) {
            throw ex;
        }
    }
        
}


