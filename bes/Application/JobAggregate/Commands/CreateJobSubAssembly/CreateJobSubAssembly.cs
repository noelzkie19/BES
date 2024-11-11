using MediatR;
using BES.Application.Common.Interfaces;
using BES.Application.Common.Exceptions;

namespace BES.Application.JobAggregate.Commands.CreateJobSubAssembly;
public class CreateJobSubAssembly : IRequest<int>
{
    public int JobId { get; set; }
}

public class CreateJobSubAssemblyJobHandler : IRequestHandler<CreateJobSubAssembly, int>
{
    private readonly IApplicationDbContext _context;

    public CreateJobSubAssemblyJobHandler(IApplicationDbContext context, IIdentityService identityService)
    {
        _context = context;
    }

    public async Task<int> Handle(CreateJobSubAssembly request, CancellationToken cancellationToken)
    {
        try
        {
            var job = _context.Jobs.FirstOrDefault(a => a.Id == request.JobId);
           
            if (job == null)
                throw new NotFoundException("Job does not exists.");

            var lastJob = _context.Jobs.OrderByDescending(a => a.Id).Select(p => p).FirstOrDefault();
            var subJobParent = _context.Jobs.Where(x => x.ParentJobNumber == request.JobId).Count() + 1;

            var jobId = job.JobId + "-" + subJobParent;
            job.SetSubAssembly(jobId, job.Id);

            await _context.Jobs.AddAsync(job);
            await _context.SaveChangesAsync(cancellationToken);

            return job.Id;

        }
        catch (Exception ex)
        {
            throw ex;
        }

    }
}
