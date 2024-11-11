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

namespace BES.Application.DeliveryAggregate.Queries.GetDeliveriesWithPagination;

public class GetDeliveriesWithPagination : IRequest<PaginatedList<DeliveryDto>>
{
    public int Skip { get; set; } = 1;
    public int Take { get; set; } = 10;
    public string Sort { get; set; } = string.Empty;
    public DateTime? Date { get; set; }
    public string? DeliveryNumber { get; set; } = string.Empty;
}

public class GetDeliveriesWithPaginationHandler : IRequestHandler<GetDeliveriesWithPagination, PaginatedList<DeliveryDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetDeliveriesWithPaginationHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<PaginatedList<DeliveryDto>> Handle(GetDeliveriesWithPagination request, CancellationToken cancellationToken)
    {
        var DeliveryDate = "";
        // DateTime DeliveryDate = new DateTime();
        if (request.Date != null)
        {
            // hasDate = "hasDate";
            // if (request.Date != null)
            //  DeliveryDate = new Date(request.Date);
            request.Date = request.Date?.AddDays(1);
            DeliveryDate = request.Date.ToDateString("yyyy-MM-dd");
        }


        var list = (from del in _context.Deliveries
                       join user in _context.UserAccounts on del.CreatedBy equals user.Email
                       into tuser from ruser in tuser.DefaultIfEmpty()
                       where del.Deleted == null
                       select new JobDeliveryVm
                       {
                           Delivery = del,
                           UserAccount = ruser,
                           DueDateString = del.Date == null ? "" : del.Date.Date.ToString(),
                           TotalQuantityDelivered = del.DeliveryLines.Sum(lines => (lines.QuantitySent)),
                       });


        var deliveryList = await list
           .Where(item => string.IsNullOrEmpty(request.DeliveryNumber) || item.Delivery.DeliveryNumber.ToString().StartsWith(request.DeliveryNumber))
           .Where(item => string.IsNullOrEmpty(DeliveryDate) || item.DueDateString == DeliveryDate)
           .OrderBy(request.Sort)
           .ProjectTo<DeliveryDto>(_mapper.ConfigurationProvider)
           .PaginatedListGridAsync(request.Skip, request.Take);
         
        foreach (var delivery in deliveryList.Items) 
        {
            var dellist = (from del in _context.DeliveryLines
                            join job in _context.Jobs on del.JobId equals job.Id
                            into jobapp from jjob in jobapp.DefaultIfEmpty()
                            join client in _context.Clients on jjob.ClientId equals client.Id
                            into clientapp from capp in clientapp.DefaultIfEmpty()

                            join address in _context.ClientAddresses on new { Id = capp.Id, Default = true }
                            equals new { Id = address.ClientId, Default = address.Default }
                            into sadd
                            from subadd in sadd.DefaultIfEmpty()

                            where del.DeliveryNumber == delivery.DeliveryNumber
                            select new JobDeliveryVm
                            {
                                DeliveryLine = del,
                                Job = jjob,
                                Client = capp,
                                ClientAddress = subadd,
                            });

            delivery.JobDeliveryLines = await dellist
                .ProjectTo<JobDeliveryLineDto>(_mapper.ConfigurationProvider)
                .ToListAsync();           
        }

        return deliveryList;
    }
}


