using MediatR;
using BES.Application.Common.Interfaces;
using BES.Domain.Entities;
using BES.Application.Common.Exceptions;

namespace BES.Application.ScheduleAggregate.Commands.UnallocateSchedule;

public class UnallocateSchedule : IRequest<Unit>
{
    public bool IsUrgent { get; set; }
    public long JobId { get; set; } = 0!;
    public string? Notes { get; set; } = null!;
    public long MainJobId { get; set; } = 0!;
}

public class UnallocateScheduleHandler : IRequestHandler<UnallocateSchedule, Unit>
{
    private readonly IApplicationDbContext _context;

    public UnallocateScheduleHandler(IApplicationDbContext context, IIdentityService identityService)
    {
        _context = context;
    }

    public async Task<Unit> Handle(UnallocateSchedule request, CancellationToken cancellationToken)
    {
        try
        {
            var job = _context.Jobs
            .Where(jb => jb.Id == request.MainJobId)
            .FirstOrDefault();

            var schedule = _context.Schedules
                .Where(jb => jb.JobId == request.MainJobId)
                .FirstOrDefault();

            if (job == null)
                throw new NotFoundException("Job does not exists.");
            if (schedule == null)
                throw new NotFoundException("Schedule does not exists.");

            job.SetSchedule(null);
            _context.Schedules.Remove(schedule);
            _context.Jobs.Update(job);

            await _context.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
        catch (Exception ex)
        {
            throw ex;
        }


    }
}
