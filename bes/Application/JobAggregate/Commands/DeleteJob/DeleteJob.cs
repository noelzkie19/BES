using BES.Application.Common.Exceptions;
using BES.Application.Common.Interfaces;
using BES.Domain.Entities;
using MediatR;

namespace BES.Application.JobAggregate.Commands.DeleteJob;

public class DeleteJob : IRequest
{
    public int Id { get; set; }
}


public class DeleteJobHandler : IRequestHandler<DeleteJob>
{
    private readonly IApplicationDbContext _context;
    public DeleteJobHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(DeleteJob request, CancellationToken cancellationToken)
    {

        var entity = await _context.Jobs
             .FindAsync(new object[] { request.Id }, cancellationToken);

        if (entity == null)
        {
            throw new NotFoundException(nameof(Job), request.Id);
        }

        _context.Jobs.Remove(entity);

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}
