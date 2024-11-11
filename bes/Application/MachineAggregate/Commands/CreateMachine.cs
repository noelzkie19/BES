using MediatR;
using BES.Application.Common.Interfaces;
using BES.Domain.Entities;
using BES.Application.MachineAggregate.Models;

namespace BES.Application.MachineAggregate.Commands.CreateMachine;

public class CreateMachine : IRequest<int>
{
    public string Description { get; set; } = string.Empty;
}

public class CreateMachineHandler : IRequestHandler<CreateMachine, int>
{
    private readonly IApplicationDbContext _context;

    public CreateMachineHandler(IApplicationDbContext context, IIdentityService identityService)
    {
        _context = context;
    }
    public async Task<int> Handle(CreateMachine request, CancellationToken cancellationToken)
    {
        try
        {
            var newMachine = new Machine(request.Description);
            _context.Machines.Add(newMachine);
            await _context.SaveChangesAsync(cancellationToken);
            return newMachine.Id;
        }
        catch (Exception ex)
        {
            throw ex;
        }

    }
}