using MediatR;
using BES.Application.Common.Interfaces;
using BES.Domain.Entities;
using BES.Application.ClientAggregate.Model;
using BES.Application.Common.Exceptions;
using BES.Application.JobAggregate.Model;
using Microsoft.EntityFrameworkCore;

namespace BES.Application.JobAggregate.Commands.UpdateDuplicatePrint;
public class UpdateDuplicatePrint : IRequest<int>
{
    public int Id { get; set; } 
}
public class UpdateDuplicatePrintHandler : IRequestHandler<UpdateDuplicatePrint, int>
{
    private readonly IApplicationDbContext _context;

    public UpdateDuplicatePrintHandler(IApplicationDbContext context, IIdentityService identityService)
    {
        _context = context;
    }
    public async Task<int> Handle(UpdateDuplicatePrint request, CancellationToken cancellationToken)
    {
        try {
            var job = await _context.Jobs
                    .FindAsync(new object[] { request.Id }, cancellationToken);

            if (job == null) 
                throw new NotFoundException("Job does not exists.");

            job.UpdateIsDuplicate();
            job.UpdateJobCardPrinted();
            _context.Jobs.Update(job);
            await _context.SaveChangesAsync(cancellationToken);

            return job.Id;
        } catch (Exception ex){
            throw ex;
        }
      
    } 

}

