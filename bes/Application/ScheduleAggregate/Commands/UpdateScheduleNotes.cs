using MediatR;
using BES.Application.Common.Interfaces;
using BES.Domain.Entities;
using BES.Application.Common.Exceptions;

namespace BES.Application.ScheduleAggregate.Commands.UpdateScheduleNotes;

public class UpdateScheduleNotes : IRequest<int>
{
    public int ScheduleId { get; set; } = 0!;
    public string? Notes { get; set; }
    public bool IsUrgent { get; set; }
}

public class UpdateScheduleNotesHandler : IRequestHandler<UpdateScheduleNotes, int>
{
    private readonly IApplicationDbContext _context;

    public UpdateScheduleNotesHandler(IApplicationDbContext context, IIdentityService identityService)
    {
        _context = context;
    }

    public async Task<int> Handle(UpdateScheduleNotes request, CancellationToken cancellationToken)
    {
        try
        {
            var schedule = _context.Schedules.Where(ops => ops.Id == request.ScheduleId).FirstOrDefault();

            if (schedule == null)
                throw new NotFoundException("Schedule does not exists.");

            schedule.setNotes(request.Notes);
            schedule.setUrgent(request.IsUrgent);
            
            _context.Schedules.Update(schedule);

            await _context.SaveChangesAsync(cancellationToken);
            return schedule.Id;
        }
        catch (Exception ex)
        {
            throw ex;
        }


    }
}
