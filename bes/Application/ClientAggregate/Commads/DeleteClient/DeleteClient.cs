using BES.Application.Common.Exceptions;
using BES.Application.Common.Interfaces;
using BES.Domain.Entities;
using MediatR;

namespace BES.Application.ClientAggregate.Commands.DeleteClient;

public class DeleteClient : IRequest
{
    public int Id { get; set; }
}


public class DeleteClientHandler : IRequestHandler<DeleteClient>
{
    private readonly IApplicationDbContext _context;
    public DeleteClientHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(DeleteClient request, CancellationToken cancellationToken)
    {

        var entity = await _context.Clients
             .FindAsync(new object[] { request.Id }, cancellationToken);

        if (entity == null)
        {
            throw new NotFoundException(nameof(Client), request.Id);
        }

        _context.Clients.Remove(entity);

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}
