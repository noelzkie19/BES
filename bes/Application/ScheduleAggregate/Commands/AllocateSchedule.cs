using MediatR;
using BES.Application.Common.Interfaces;
using BES.Domain.Entities;
using BES.Application.Common.Exceptions;

namespace BES.Application.ScheduleAggregate.Commands.AllocateSchedule;

public class AllocateSchedule : IRequest<int>
{
    public bool IsUrgent { get; set; }
    public int MainJobId { get; set; } = 0!;
    public string? Notes { get; set; } = null!;
    public int? Assignee { get; set; } = null!;
}

public class AllocateScheduleHandler : IRequestHandler<AllocateSchedule, int>
{
    private readonly IApplicationDbContext _context;

    public AllocateScheduleHandler(IApplicationDbContext context, IIdentityService identityService)
    {
        _context = context;
    }

    public async Task<int> Handle(AllocateSchedule request, CancellationToken cancellationToken)
    {
        try
        {
             var job = _context.Jobs
             .Where(jb => jb.Id == request.MainJobId)
             .FirstOrDefault();

            if (job == null)
                throw new NotFoundException("Job does not exists.");
            

            var newSchedules = new Schedule(request.IsUrgent, request.MainJobId, request.Notes, request.Assignee);
            job.SetSchedule(new DateTime());


            _context.Schedules.Add(newSchedules);
            _context.Jobs.Update(job);

            var Operations = _context.Operations
            .Where(jb => jb.JobId == request.MainJobId)
            .ToList();

            if (Operations.Count() > 0)
            {
                foreach (var operation in Operations)
                {
                    operation.setStaff(request.Assignee);
                }
                _context.Operations.UpdateRange(Operations);
            }
            
            await _context.SaveChangesAsync(cancellationToken);
            return newSchedules.Id;
        }
        catch (Exception ex)
        {
            throw ex;
        }


    }
}
