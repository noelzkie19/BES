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
using BES.Domain.Entities;

namespace BES.Application.UserAggregate.Queries.GetUserByEmail;

public class GetUserByEmail : IRequest<UserAccountDto>
{
    public string Email { get; set; }
}

public class GetUserByEmailsHandler : IRequestHandler<GetUserByEmail, UserAccountDto>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly IUserService _userService;

    public GetUserByEmailsHandler(IApplicationDbContext context, IMapper mapper, IIdentityService identityService,IUserService userService)
    {
        _context = context;
        _mapper = mapper;
        _userService = userService;
    }

    public async Task<UserAccountDto> Handle(GetUserByEmail request, CancellationToken cancellationToken)
    {
        try 
        {
            var user = await _context.UserAccounts
                              .Where(acc => acc.Email == request.Email)
                              .ProjectTo<UserAccountDto>(_mapper.ConfigurationProvider)
                              .FirstOrDefaultAsync();

            if(user == null) 
            {
                user = new UserAccountDto
                {
                    Id = 1,
                    UserName = request.Email,
                    Email = request.Email,
                    FirstName = "Administrator",
                    LastName = "",
                    IsActive = true,
                    UserRoles = {"Administrator"}
                };
            }

            //
            user.UserRoles = await _userService.GetRolesByEmail(user.Email);
            // Map<UserAccountDto>()
            return user;
        } 
        catch (Exception ex) 
        {
            throw ex;
        }
     
    }
}


