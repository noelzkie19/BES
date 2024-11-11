
using BES.Application.Common.Mappings;
using BES.Domain.Entities;

namespace BES.Application.AboutAggregate.Models
{
    public class AboutDto : IMapFrom<About>
    {
        public int Id { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Website { get; set; }
        public string ABN { get; set; }
    }
}
