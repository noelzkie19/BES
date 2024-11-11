using AutoMapper;
using AutoMapper.QueryableExtensions;
using BES.Application.Common.Interfaces;
using BES.Application.Common.Models;
using MediatR;
using BES.Application.Common.Mappings;
using BES.Application.DeliveryAggregate.Model;
using System.Linq.Dynamic.Core;

namespace BES.Application.DeliveryAggregate.Queries.GetDeliveriesPendingWithPagination;

public class GetDeliveriesPendingWithPagination : IRequest<PaginatedList<JobDeliveryDto>>
{
    public int Skip { get; set; } = 1;
    public int Take { get; set; } = 10;
    public string Sort { get; set; } = string.Empty;

    public string? ClientName { get; set; }
    public string? OrderNumber { get; set; } = string.Empty;
    public string? DrawingNumber { get; set; }
    public string? JobId { get; set; }
    public string? Description { get; set; }
    public string? RevisionNumber { get; set; }
    
}

public class GetDeliveriesPendingWithPaginationHandler : IRequestHandler<GetDeliveriesPendingWithPagination, PaginatedList<JobDeliveryDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetDeliveriesPendingWithPaginationHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<PaginatedList<JobDeliveryDto>> Handle(GetDeliveriesPendingWithPagination request, CancellationToken cancellationToken)
    {
        var list = (from job in _context.Jobs
          
                    join client in _context.Clients on job.ClientId equals client.Id 
                    into clientapp from capp in clientapp.DefaultIfEmpty()
                    // where job.ParentJobNumber == null
                    select new JobDeliveryVm
                    {
                        Job = job,
                        Client = capp
                    });

        var deliveryList = await list
        .Where(x => x.Job.Quantity > x.Job.DeliveryLines.Sum(x => (x.QuantitySent)))
        .Where(item => string.IsNullOrEmpty(request.JobId) || item.Job.JobId.StartsWith(request.JobId))
        .Where(item => string.IsNullOrEmpty(request.Description) || item.Job.Description.StartsWith(request.Description))
        .Where(item => string.IsNullOrEmpty(request.ClientName) || item.Client.Name.StartsWith(request.ClientName))
        .Where(item => string.IsNullOrEmpty(request.RevisionNumber) || item.Job.RevisionNumber.StartsWith(request.RevisionNumber))
        .Where(item => string.IsNullOrEmpty(request.OrderNumber) || item.Job.OrderNumber.StartsWith(request.OrderNumber))
        .Where(item => string.IsNullOrEmpty(request.DrawingNumber) || item.Job.DrawingNumber.StartsWith(request.DrawingNumber))
        .OrderBy(request.Sort)
        .ProjectTo<JobDeliveryDto>(_mapper.ConfigurationProvider)
        .PaginatedListGridAsync(request.Skip, request.Take);

        return deliveryList;
    }
}


