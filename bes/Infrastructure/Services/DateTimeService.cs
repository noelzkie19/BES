using BES.Application.Common.Interfaces;

namespace BES.Infrastructure.Services;

public class DateTimeService : IDateTime
{
    public DateTime Now => DateTime.Now;
}
