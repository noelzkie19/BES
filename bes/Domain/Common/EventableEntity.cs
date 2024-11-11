
namespace BES.Domain.Common;

public abstract class EventableEntity
{
    public DateTime Created { get; set; }

    public string? CreatedBy { get; set; }

}
