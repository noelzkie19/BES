  
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
namespace BES.Domain.Entities
{
    public class UserAccount : AuditableEntity , IHasDomainEvent
    {
        public UserAccount() {}

        public UserAccount(string userName, string email, string firstName, string lastName, bool isActive , bool isResetPasswordRequired, string initialPassword)
        {
            UserName = userName;
            Email = email;
            FirstName = firstName;
            LastName = lastName;
            IsActive = isActive;
            IsResetPasswordRequired = isResetPasswordRequired;
            InitialPassword = initialPassword;
        }
        public string UserName { get; private set; } = string.Empty;
        public string Email { get; private set; } = string.Empty;
        public string FirstName {get; private set;} = string.Empty;
        public string LastName { get; private set;} = string.Empty;
        public bool IsActive { get; private set; } = false;
        public bool IsResetPasswordRequired { get; private set; } = false;
        public string InitialPassword { get; private set; } = string.Empty;

        public void UpdateUserAccount(string firstName, string lastName, bool isActive , bool isResetPasswordRequired)
        {
            FirstName = firstName;
            LastName = lastName;
            IsActive = isActive;
            IsResetPasswordRequired = isResetPasswordRequired;
        }
        public void UpdateChangePasswordRequired(bool isResetPasswordRequired){
            IsResetPasswordRequired = isResetPasswordRequired;
        }

        [NotMapped]
        public List<DomainEvent> DomainEvents { get; set; } = new List<DomainEvent>();

    }
}

