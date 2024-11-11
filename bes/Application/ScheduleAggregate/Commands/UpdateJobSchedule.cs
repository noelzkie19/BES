using MediatR;
using BES.Application.Common.Interfaces;
using BES.Domain.Entities;
using BES.Application.Common.Exceptions;

namespace BES.Application.ScheduleAggregate.Commands.UpdateJobSchedule;

public class UpdateJobSchedule : IRequest<int>
{
    public int OperationId { get; set; } = 0!;
    public int? MachineId { get; set; }
    public int? StaffId { get; set; }

}

public class UpdateJobScheduleHandler : IRequestHandler<UpdateJobSchedule, int>
{
    private readonly IApplicationDbContext _context;

    public UpdateJobScheduleHandler(IApplicationDbContext context, IIdentityService identityService)
    {
        _context = context;
    }

    public async Task<int> Handle(UpdateJobSchedule request, CancellationToken cancellationToken)
    {
        try
        {
            var operation = _context.Operations.Where(ops => ops.Id == request.OperationId).FirstOrDefault();

            if (operation == null)
                throw new NotFoundException("Operation does not exists.");

            operation.setMachine(request.MachineId);
            operation.setStaff(request.StaffId);
            _context.Operations.Update(operation);

            await _context.SaveChangesAsync(cancellationToken);
            return operation.Id;
        }
        catch (Exception ex)
        {
            throw ex;
        }


    }
}
