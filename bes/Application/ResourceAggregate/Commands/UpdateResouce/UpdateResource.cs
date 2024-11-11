using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BES.Application.Common.Exceptions;
using BES.Application.Common.Interfaces;
using MediatR;

namespace BES.Application.ResourceAggregate.Commands.UpdateResouce;

public class UpdateResource : IRequest<int>
{

    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string Description { get; set; } = null!;
    public decimal HourlyRate { get; set; }
    public bool IsActive { get; set; }
}

public class UpdateResourceHandler : IRequestHandler<UpdateResource, int>
{
    private readonly IApplicationDbContext _context;

    public UpdateResourceHandler(IApplicationDbContext context, IIdentityService identityService)
    {
        _context = context;
    }

    public async Task<int> Handle(UpdateResource request, CancellationToken cancellationToken)
    {
        var resource = await _context.Resources.FindAsync(new object[] { request.Id }, cancellationToken);

        if (resource == null)
            throw new NotFoundException("Stock does not exists.");

        resource.Update(request.Name, request.Description, request.HourlyRate, request.IsActive);

        await _context.SaveChangesAsync(cancellationToken);
        return resource.Id;

    }
}