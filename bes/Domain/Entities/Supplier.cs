using System;
using System.Collections.Generic;

namespace BES.Domain.Entities
{
    public class Supplier : AuditableEntity
    {
        public Supplier()
        {
            Materials = new HashSet<Material>();
            SupplierAddresses = new HashSet<SupplierAddress>();
            SupplierContacts = new HashSet<SupplierContact>();
            SupplierEmailHistories = new HashSet<SupplierEmailHistory>();
            
        }

        public Supplier(string name, string phone, string fax, string email, string contactPerson,
           string operatingHrs)
        {
            Name = name;
            Phone = phone;
            Fax = fax;
            Email = email;
            OperatingHrs = operatingHrs;
            ContactPerson = contactPerson;
            SupplierAddresses = new HashSet<SupplierAddress>();
            SupplierContacts = new HashSet<SupplierContact>();
            SupplierEmailHistories = new HashSet<SupplierEmailHistory>();
        }

        public void Update(string name, string phone, string fax, string email, string contactPerson,
           string operatingHrs)
        {
            Name = name;
            Phone = phone;
            Fax = fax;
            Email = email;
            OperatingHrs = operatingHrs;
            ContactPerson = contactPerson;
        }


        public long? SupplierNumber { get; set; }
        public int? AccountId { get; set; }
        public string Name { get; set; } = null!;
        public string Fax { get; set; } = null!;
        public string Phone { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string ContactPerson { get; set; } = null!;
        public string OperatingHrs { get; set; } = null!;

        public virtual Account? Account { get; set; }
        public virtual SupplierApproval SupplierApproval { get; set; }
        public virtual ICollection<SupplierAddress> SupplierAddresses { get; set; }
        public virtual ICollection<SupplierContact> SupplierContacts { get; set; }
        public virtual ICollection<Material> Materials { get; set; }
        public virtual ICollection<SupplierEmailHistory> SupplierEmailHistories { get; set; }
    }
}
