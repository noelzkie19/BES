using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using AutoMapper;
using BES.Application.Common.Mappings;
using BES.Domain.Entities;

namespace BES.Application.ClientAggregate.Model
{
    public class ClientListDto : IMapFrom<Client>
    {
        public int? Id { get; set; }
        public string Name { get; set; } = null!;
        public string Phone { get; set; } = null!;
        public string Fax { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string ContactPerson { get; set; } = null!;
        public string OperatingHrs { get; set; } = null!;

        public bool Default { get; set; }
        public string AddressType { get; set; } = null!;
        public string Street { get; set; } = null!;
        public string Suburb { get; set; } = null!;
        public string State { get; set; } = null!;
        public string PostCode { get; set; } = null!;

    }

    
}
