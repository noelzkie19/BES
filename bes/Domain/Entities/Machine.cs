using System;
using System.Collections.Generic;

namespace BES.Domain.Entities
{
    public class Machine : BaseEntity
    {
        public Machine(string description) 
        {
            this.Description = description;
        }
        public string Description { get; set; }
    }
}
