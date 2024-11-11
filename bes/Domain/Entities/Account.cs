using System;
using System.Collections.Generic;

namespace BES.Domain.Entities
{
    public class Account : AuditableEntity
    {
        public Account()
        {
            Clients = new HashSet<Client>();
            Suppliers = new HashSet<Supplier>();
        }


        public Account(string number, string name, string email, string type)
        {

            Number = number;
            Name = name;
            Email = email;
            Type = type;
            Clients = new HashSet<Client>();
            Suppliers = new HashSet<Supplier>();
        }


        public string Number { get; private set; } = null!;
        public string Name { get; private set; } = null!;
        public string? Email { get; private set; }
        public string Type { get; private set; } = null!;

        public virtual ICollection<Client> Clients { get; set; }
        public virtual ICollection<Supplier> Suppliers { get; set; }
    }
}
