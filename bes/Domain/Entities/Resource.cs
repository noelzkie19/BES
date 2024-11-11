using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
namespace BES.Domain.Entities
{
    public class Resource : AuditableEntity
    {
        public Resource()
        {
            
        }
        public Resource(string name, string description, decimal hourlyRate, bool inActive)
        {
            Name = name;
            Description = description;
            HourlyRate = hourlyRate;
            IsActive = inActive;
        }

        public void Update(string name, string description, decimal hourlyRate, bool inActive)
        {
            Name = name;
            Description = description;
            HourlyRate = hourlyRate;
            IsActive = inActive;
        }

        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
        public decimal HourlyRate { get; set; }
        public bool IsActive { get; set; }
    }
}
