using AutoMapper;
using AutoMapper.QueryableExtensions;
using BES.Application.Common.Interfaces;
using BES.Application.Common.Models;
using MediatR;
using BES.Application.Common.Mappings;
using System.Linq.Dynamic.Core;
using Microsoft.EntityFrameworkCore;
using BES.Application.JobAggregate.Model;
using BES.Application.Common.Exceptions;
using BES.Application.JobAggregate.Models;
using BES.Application.JobAggregate.Queries.GetJobAssembliesByJob;

namespace BES.Application.JobAggregate.Queries.GetJobById;

public class GetJobById : IRequest<JobDto>
{
    public int Id { get; set; }
}

public class GetJobByIdHandler : IRequestHandler<GetJobById, JobDto>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly IMediator _mediator;
    public GetJobByIdHandler(IApplicationDbContext context, IMapper mapper, IMediator mediator)
    {
        _context = context;
        _mapper = mapper;
        _mediator = mediator;
    }

    public async Task<JobDto> Handle(GetJobById request, CancellationToken cancellationToken)
    {
        var list = (from job in _context.Jobs
                    join jobtype in _context.JobTypes on job.JobTypeId equals jobtype.Id
                    join client in _context.Clients on job.ClientId equals client.Id
                    join quote in _context.Quotes on job.QuoteNumberSource equals quote.Id
                    into qt from qtD in qt.DefaultIfEmpty()
                    join user in _context.UserAccounts on job.CreatedBy equals user.Email
                    into saddinto
                    from subaddtemp in saddinto.DefaultIfEmpty()

                    join stock in _context.Stocks on job.Id equals stock.JobId
                    into stockinto
                    from stocktemp in stockinto.DefaultIfEmpty()

                    join stock2 in _context.Stocks
                    on new { Revision = job.RevisionNumber, Drawing = job.DrawingNumber }
                    equals new { stock2.Revision, stock2.Drawing }
                    into revisionDrawingJoin
                    from revisionDrawingStock in revisionDrawingJoin.DefaultIfEmpty()

                    where job.Id == request.Id
                    select new JobVm
                    {
                        Job = job,
                        Client = client,
                        JobType = jobtype,
                        Quote = qtD,
                        Status = job.Delivered ? "Delivered" : "Not Delivered",
                        CreatedByName = subaddtemp == null ? "Administration" : subaddtemp.FirstName + " " + subaddtemp.LastName,
                        StockQty = revisionDrawingStock != null ? revisionDrawingStock.Quantity : stocktemp.Quantity
                    });

        var jobdetail = await list
            .ProjectTo<JobDto>(_mapper.ConfigurationProvider)
            .FirstOrDefaultAsync();
            

        if (jobdetail == null)
            throw new NotFoundException("Job does not exists.");

        var jobNotes = (from note in _context.JobNotes

                    join user in _context.UserAccounts on note.CreatedBy equals user.Email
                    into saddinto
                    from subaddtemp in saddinto.DefaultIfEmpty()

                    where note.JobId == request.Id 

                    select new JobVm
                    {
                        JobNote = note,
                        CreatedByName = subaddtemp == null ? "Administration" : subaddtemp.FirstName + " " + subaddtemp.LastName 
                    }
                );


        var jobDelivery = (from line in _context.DeliveryLines
                    join del in _context.Deliveries on line.DeliveryNumber equals del.DeliveryNumber
                    join user in _context.UserAccounts on del.CreatedBy equals user.Email
                    into saddinto
                    from subaddtemp in saddinto.DefaultIfEmpty()
                    where line.JobId == request.Id
                    select new JobVm
                    {
                        DeliveryLine = line,
                        Delivery = del,
                        UserAccount = subaddtemp
                    });

        var SubAssembies = await _context.Jobs
        .Where(x => x.ParentJobNumber == jobdetail.Id && x.ParentJobNumber != null)
        .ProjectTo<JobSubassemblyDto>(_mapper.ConfigurationProvider)
        .ToListAsync();
    
                
        jobdetail.SubAssembies = SubAssembies; 
        jobdetail.JobNotes = await jobNotes.ProjectTo<JobNoteDto>(_mapper.ConfigurationProvider).ToListAsync();
        jobdetail.JobDeliveries = await jobDelivery.ProjectTo<JobDeliveriesDto>(_mapper.ConfigurationProvider).ToListAsync();

        return jobdetail;
    }
}


