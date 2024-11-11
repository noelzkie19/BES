using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace BES.Domain.Entities
{
    public class SupplierAddress : BaseEntity
    {
        public int SupplierId { get; private set; }
        public string AddressType { get; private set; } = null!;
        public string Street { get; private set; } = null!;
        public string Suburb { get; private set; } = null!;
        public string State { get; private set; } = null!;
        public string PostCode { get; private set; } = null!;
        public bool Default { get; private set; }
        public string PostalAddress { get; private set; } = null!;
        public string PostalSuburb { get; private set; } = null!;
        public string PostalState { get; private set; } = null!;
        public string PostalPostCode { get; private set; } = null!;
        
        public virtual Supplier? Supplier { get; private set; }


        public SupplierAddress () {}

        public SupplierAddress(int supplierId, string addressType, string street, string suburb,
            string state, string postCode, bool defaultAddress, string postalAddress, string postalSuburb, string postalState, 
            string postalPostCode)
        {
            SupplierId = supplierId;
            AddressType = addressType;
            Street = street;
            Suburb = suburb;
            State = state;
            PostCode = postCode;
            Default = defaultAddress;
            PostalAddress = postalAddress;
            PostalSuburb = postalSuburb;
            PostalState = postalState;
            PostalPostCode = postalPostCode;
        }


        public void Update(string addressType,
            string street, string suburb, string state, string postCode, bool defaultAddress, string postalAddress, 
            string postalSuburb, string postalState, string postalPostCode)
        {
            AddressType = addressType;
            Street = street;
            Suburb = suburb;
            State = state;
            PostCode = postCode;
            Default = defaultAddress;
            PostalAddress = postalAddress;
            PostalSuburb = postalSuburb;
            PostalState = postalState;
            PostalPostCode = postalPostCode;
        }


    }
}
