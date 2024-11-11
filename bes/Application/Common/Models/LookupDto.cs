using BES.Application.Common.Mappings;

namespace BES.Application.Common.Models;

// Note: This is currently just used to demonstrate applying multiple IMapFrom attributes.
public class LookupDto 
{
    public int Id { get; set; }

    public string? Title { get; set; }
}
