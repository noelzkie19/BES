using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using BES.Application.Common.Mappings;
using BES.Domain.Entities;

namespace BES.Application.SupplierAggregate.Model
{
    public class SupplierAddressDto : IMapFrom<SupplierAddress>
    {
        public int? Id { get; set; }
        public bool Default { get; set; }
        public string AddressType { get; set; } = null!;
        public string Street { get; set; } = null!;
        public string Suburb { get; set; } = null!;
        public string State { get; set; } = null!;
        public string PostCode { get; set; } = null!;
        public string PostalAddress { get; set; } = null!;
        public string PostalSuburb { get; set; } = null!;
        public string PostalState { get; set; } = null!;
        public string PostalPostCode { get; set; } = null!;
        public bool IsDeleted { get; set; }
    }
}
