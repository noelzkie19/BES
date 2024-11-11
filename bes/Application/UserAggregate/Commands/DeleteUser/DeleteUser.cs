using BES.Application.Common.Exceptions;
using BES.Application.Common.Interfaces;
using BES.Domain.Entities;
using MediatR;

namespace BES.Application.UserAggregate.Commands.DeleteUser;

public class DeleteUser : IRequest
{
    public int Id { get; set; }
}


public class DeleteUserHandler : IRequestHandler<DeleteUser>
{
    private readonly IApplicationDbContext _context;
    public DeleteUserHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(DeleteUser request, CancellationToken cancellationToken)
    {

        var entity = await _context.UserAccounts
             .FindAsync(new object[] { request.Id }, cancellationToken);

        if (entity == null)
        {
            throw new NotFoundException(nameof(UserAccount), request.Id);
        }
        if (entity.IsActive){
            throw new ThrowErrorException("User is Active");
        }

        _context.UserAccounts.Remove(entity);

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}
