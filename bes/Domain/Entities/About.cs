using System;
using System.Collections.Generic;

namespace BES.Domain.Entities
{
    public class About : AuditableEntity
    {
        public About() {}
        public About(string address, string phone, string email, string website, string abn)
        {
            Address = address;
            Phone =  phone;
            Email = email;
            Website = website;
            ABN = abn;
        }

        public void Update(string address, string phone, string email, string website, string abn)
        {
            Address = address;
            Phone =  phone;
            Email = email;
            Website = website;
            ABN = abn;
        }
        public string Address { get; private set; }
        public string Phone { get; private set; }
        public string Email { get; private set; }
        public string Website { get; private set; }
        public string ABN { get; private set; }
    }
}
