
using BES.Application.Common.Mappings;
using BES.Domain.Entities;

namespace BES.Application.AccountAggregate.Models
{
    public class AccountDto : IMapFrom<Account>
    {
        public int Id { get; set; }
        public string Number { get; set; } = null!;
        public string Name { get; set; } = null!;
        public string? Email { get; set; }
        public string Type { get; set; } = null!;
    }
}
