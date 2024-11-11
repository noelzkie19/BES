using MediatR;
using BES.Application.Common.Interfaces;
using BES.Domain.Entities;
using BES.Application.StockAggregate.Model;

namespace BES.Application.StockAggregate.Commands.CreateJobType;
public class CreateJobType : IRequest<int>
{
    public int? Id { get; set; }
    public string Description { get; set; } = null!;
}

public class CreateJobTypeHandler : IRequestHandler<CreateJobType, int>
{
    private readonly IApplicationDbContext _context;

    public CreateJobTypeHandler(IApplicationDbContext context, IIdentityService identityService)
    {
        _context = context;
    }

    public async Task<int> Handle(CreateJobType request, CancellationToken cancellationToken)
    {
        var newJobType = new JobType(request.Description);
        _context.JobTypes.Add(newJobType);
        await _context.SaveChangesAsync(cancellationToken);
        return newJobType.Id;
    }
}
