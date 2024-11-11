using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using BES.Application.Common.Mappings;
using BES.Domain.Entities;

namespace BES.Application.ClientAggregate.Model
{
    public class ClientContactDto : IMapFrom<ClientContact>
    {
        public int? Id { get; set; }
        public int? ClientId { get; set; }
        public string ContactName { get; set; } = null!;
        public string Position { get; set; } = null!;
        public string Phone { get; set; } = null!;
        public string Mobile { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Notes { get; set; } = null!;
    }
}
