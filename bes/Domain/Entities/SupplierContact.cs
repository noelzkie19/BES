using System;
using System.Collections.Generic;

namespace BES.Domain.Entities
{
    public class SupplierContact : AuditableEntity
    {

        public SupplierContact(int supplierId, string contactName, string position, string phone, string mobile, string email, string notes)
        {
            SupplierId = supplierId;
            ContactName = contactName;
            Position = position;
            Phone = phone;
            Mobile = mobile;
            Email = email;
            Notes = notes;
        }

        public void Update(string contactName, string position, string phone, string mobile, string email, string notes)
        {
            ContactName = contactName;
            Position = position;
            Phone = phone;
            Mobile = mobile;
            Email = email;
            Notes = notes;
        }

        public long ContactId { get; set; }
        public long SupplierNumber { get; set; }
        public int SupplierId { get; private set; }
        public string ContactName { get; set; } = null!;
        public string Position { get; set; } = null!;
        public string Phone { get; set; } = null!;
        public string Mobile { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string? Notes { get; set; }

        public virtual Supplier? Supplier { get; private set; }
    }
}
