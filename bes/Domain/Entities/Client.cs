using System;
using System.Collections.Generic;

namespace BES.Domain.Entities
{
    public class Client : AuditableEntity
    {
        public Client() {
            ClientEmailHistories = new HashSet<ClientEmailHistory>();
        }
        public Client(string name, string  phone, string fax, string email, string contactPerson,
            string operatingHrs, string clientType, string shortName)
        {
            Name = name;
            Phone = phone;
            Fax = fax;
            Email = email;
            OperatingHrs = operatingHrs;
            ContactPerson = contactPerson;
            ClientType = clientType;
            ShortName = shortName;
            ClientAddresses = new HashSet<ClientAddress>();
            ClientContacts = new HashSet<ClientContact>();
            ClientEmailHistories = new HashSet<ClientEmailHistory>();

        }

        public void Update(string name, string phone, string fax, string email, string contactPerson,
            string operatingHrs, string clientType, string shortName)
        {
            ClientType = clientType;
            Name = name;
            Phone = phone;
            Fax = fax;
            Email = email;
            OperatingHrs = operatingHrs;
            ContactPerson = contactPerson;
            ShortName = shortName;
        }

        public string Name { get; private set; } = null!;
        public string Phone { get; private set; } = null!;
        public string Fax { get; private set; } = null!;
        public string Email { get; private set; } = null!;
        public string ContactPerson { get; private set; } = null!;
        public string OperatingHrs { get; private set; } = null!;
        public string ClientType { get; private set; } = null!;
        public string ShortName { get; private set; } = null!;
        public virtual Account? Account { get; private set; }
        public virtual ICollection<ClientContact> ClientContacts { get; private set; }
        public virtual ICollection<Job>? Jobs { get; private set; }
        public virtual ICollection<Quote>? Quotes { get; private set; }
        public virtual ICollection<ClientAddress> ClientAddresses { get; private set; }
        public virtual ICollection<ClientEmailHistory> ClientEmailHistories { get; set; }

    }
}
