
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using AutoMapper;
using BES.Application.Common.Mappings;
using BES.Domain.Entities;

namespace BES.Application.UserAggregate.Models
{
    public class UserAccountDto : IMapFrom<UserAccount>
    {
        public int? Id { get; set; }
        public string UserName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public bool IsActive { get; set; } = false;
        public bool IsResetPasswordRequired { get; set; } = false;
        public List<string> UserRoles { get; set; } = new List<string>();
        public string Status
        { 
            get 
            {
                return this.IsActive? "Active" : "Inactive";
            }
        }

        public string UserRoleDisplay 
        { 
            get 
            {
                return String.Join(", ", UserRoles);
            }
        }
    }
}