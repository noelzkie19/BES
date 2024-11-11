using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BES.Application.Common.Interfaces;
using BES.Domain.Entities;
using MediatR;

namespace BES.Application.ResourceAggregate.Commands.CreateResource;

public class CreateResource : IRequest<int>
{
    public string Name { get; set; } = null!;
    public string Description { get; set; } = null!;
    public decimal HourlyRate { get; set; }
    public bool IsActive { get; set; }
}


public class CreateResourceHandler : IRequestHandler<CreateResource, int>
{
    private readonly IApplicationDbContext _context;

    public CreateResourceHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<int> Handle(CreateResource request, CancellationToken cancellationToken)
    {
        try
        {
            var newResource = new Resource(request.Name, request.Description, request.HourlyRate, request.IsActive);
            _context.Resources.Add(newResource);
            await _context.SaveChangesAsync(cancellationToken);
            return newResource.Id;
        }
        catch (Exception ex)
        {
            throw ex;
        }

    }
}