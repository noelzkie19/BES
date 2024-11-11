using AutoMapper;
using AutoMapper.QueryableExtensions;
using BES.Application.Common.Interfaces;
using BES.Application.Common.Models;
using MediatR;
using BES.Application.Common.Mappings;
using BES.Application.DeliveryAggregate.Model;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;
using BES.Application.Common.Extensions;

namespace BES.Application.DeliveryAggregate.Queries.GetDeliveriesWithPaginationV2;

public class GetDeliveriesWithPaginationV2 : IRequest<PaginatedList<JobDeliveryLineDto>>
{
    public string Tag { get; set; } = string.Empty;
    public int Skip { get; set; } = 1;
    public int Take { get; set; } = 10;
    public string Sort { get; set; } = string.Empty;
    public DateTime? Date { get; set; }
    public string? DeliveryNumber { get; set; } = string.Empty;
    public string? ClientName { get; set; } = string.Empty;
    public string? Courier { get; set; } = string.Empty;
    public string? CreatedByName { get; set; } = string.Empty;
    public string? Description { get; set; } = string.Empty;
    public string? DrawingNumber { get; set; } = string.Empty;
    public string? JobId { get; set; } = string.Empty;
    public string? OrderNumber { get; set; } = string.Empty;
}

public class GetDeliveriesWithPaginationV2Handler : IRequestHandler<GetDeliveriesWithPaginationV2, PaginatedList<JobDeliveryLineDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetDeliveriesWithPaginationV2Handler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<PaginatedList<JobDeliveryLineDto>> Handle(GetDeliveriesWithPaginationV2 request, CancellationToken cancellationToken)
    {
        var DeliveryDate = "";
        if (request.Date != null)
        {
            request.Date = request.Date?.AddDays(1);
            DeliveryDate = request.Date.ToDateString("yyyy-MM-dd");
        }

        var dellist = (from del in _context.DeliveryLines
                        join hdr in _context.Deliveries on del.DeliveryNumber equals hdr.DeliveryNumber
                        join job in _context.Jobs on del.JobId equals job.Id
                        into jobapp from jjob in jobapp.DefaultIfEmpty()
                        join client in _context.Clients on jjob.ClientId equals client.Id
                        into clientapp from capp in clientapp.DefaultIfEmpty()

                        join address in _context.ClientAddresses on new { Id = capp.Id, Default = true }
                        equals new { Id = address.ClientId, Default = address.Default }
                        into sadd
                        from subadd in sadd.DefaultIfEmpty()


                        join user in _context.UserAccounts on hdr.CreatedBy equals user.Email
                        into saddinto
                        from subaddtemp in saddinto.DefaultIfEmpty()

                        select new JobDeliveryVm
                        {
                            Delivery = hdr,
                            DeliveryLine = del,
                            Job = jjob,
                            Client = capp,
                            ClientAddress = subadd,
                            DueDateString = hdr.Date == null ? "" : hdr.Date.Date.ToString(),
                            CreatedByName = subaddtemp == null ? "Administration" : subaddtemp.FirstName + " " + subaddtemp.LastName 
                        });

       var deliveryList = await dellist
        .Where(item => string.IsNullOrEmpty(request.DeliveryNumber) || item.Delivery.DeliveryNumber.ToString().StartsWith(request.DeliveryNumber))
        .Where(item => string.IsNullOrEmpty(request.JobId) || item.Job.JobId.StartsWith(request.JobId))
        .Where(item => string.IsNullOrEmpty(request.Description) || item.Job.Description.StartsWith(request.Description))
        .Where(item => string.IsNullOrEmpty(request.ClientName) || item.Client.Name.StartsWith(request.ClientName))
        //.Where(item => string.IsNullOrEmpty(request.Courier) || item.Delivery.Courier.StartsWith(request.Courier))
        .Where(item => string.IsNullOrEmpty(request.OrderNumber) || item.Job.OrderNumber.StartsWith(request.OrderNumber))
        .Where(item => string.IsNullOrEmpty(request.DrawingNumber) || item.Job.DrawingNumber.StartsWith(request.DrawingNumber))
        .Where(item => string.IsNullOrEmpty(request.CreatedByName) || item.CreatedByName.StartsWith(request.CreatedByName))
        .Where(item => string.IsNullOrEmpty(DeliveryDate) || item.DueDateString == DeliveryDate)
        .Where(item => request.Tag != "noRunTime" || (item.Job != null && item.Job.JobDatePrinted == null))
        .OrderBy(request.Sort)
        .ProjectTo<JobDeliveryLineDto>(_mapper.ConfigurationProvider)
        .PaginatedListGridAsync(request.Skip, request.Take);         


        return deliveryList;
    }
}


