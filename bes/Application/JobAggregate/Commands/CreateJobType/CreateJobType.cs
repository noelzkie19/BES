using MediatR;
using BES.Application.Common.Interfaces;
using BES.Domain.Entities;
using BES.Application.JobAggregate.Model;

namespace BES.Application.JobAggregate.Commands.CreateJobType;
public class CreateJobType : IRequest<int>
{
    public string Description { get; set; } = null!;
}

public class CreateJobTypeHandler : IRequestHandler<CreateJobType, int>
{
    private readonly IApplicationDbContext _context;

    public CreateJobTypeHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<int> Handle(CreateJobType request, CancellationToken cancellationToken)
    {
        try {
            
            var jobType = new JobType(request.Description);
            _context.JobTypes.Add(jobType);
            
            await _context.SaveChangesAsync(cancellationToken);
            return jobType.Id;

        }catch ( Exception ex){
            return 0;
        }
        
    }
}
