using BES.Application.Common.Exceptions;
using BES.Application.Common.Interfaces;
using BES.Domain.Entities;
using MediatR;

namespace BES.Application.ResourceAggregate.Commands.DeleteResource;

public class DeleteResource : IRequest
{
    public int Id { get; set; }
}
public class DeleteResourceHandler : IRequestHandler<DeleteResource> 
{
    private readonly IApplicationDbContext _context;
    public DeleteResourceHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(DeleteResource request, CancellationToken cancellationToken)
    {

        var entity = await _context.Resources
             .FindAsync(new object[] { request.Id }, cancellationToken);

        if (entity == null)
        {
            throw new NotFoundException(nameof(Resource), request.Id);
        }

        _context.Resources.Remove(entity);

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}