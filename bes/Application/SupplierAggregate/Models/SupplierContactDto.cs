
using BES.Application.Common.Mappings;
using BES.Domain.Entities;

namespace BES.Application.SupplierAggregate.Model
{
    public class SupplierContactDto : IMapFrom<SupplierContact>
    {
        public int? Id { get; set; }
        public int? ClientId { get; set; }
        public string ContactName { get; set; } = null!;
        public string Position { get; set; } = null!;
        public string Phone { get; set; } = null!;
        public string Mobile { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Notes { get; set; } = null!;
        public bool IsDeleted { get; set; }
    }
}
