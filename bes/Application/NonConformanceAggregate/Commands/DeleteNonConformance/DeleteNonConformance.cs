using BES.Application.Common.Exceptions;
using BES.Application.Common.Interfaces;
using BES.Domain.Entities;
using MediatR;

namespace BES.Application.NonConformanceAggregate.Commands.DeleteNonConformance;

public class DeleteNonConformance : IRequest
{
    public int Id { get; set; }
}


public class DeleteNonConformanceHandler : IRequestHandler<DeleteNonConformance>
{
    private readonly IApplicationDbContext _context;
    public DeleteNonConformanceHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(DeleteNonConformance request, CancellationToken cancellationToken)
    {

        var entity = await _context.NonConformances
             .FindAsync(new object[] { request.Id }, cancellationToken);

        if (entity == null)
        {
            throw new NotFoundException(nameof(Job), request.Id);
        }

        _context.NonConformances.Remove(entity);

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}
