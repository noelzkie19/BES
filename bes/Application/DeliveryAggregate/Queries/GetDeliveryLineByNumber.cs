using AutoMapper;
using AutoMapper.QueryableExtensions;
using BES.Application.Common.Interfaces;
using BES.Application.Common.Models;
using MediatR;
using BES.Application.Common.Mappings;
using BES.Application.DeliveryAggregate.Model;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;
using BES.Application.Common.Exceptions;

namespace BES.Application.DeliveryAggregate.Queries.GetDeliveryLineByNumber;

public class GetDeliveryLineByNumber : IRequest<DeliveryDto>
{
    public long Id { get; set; }
}

public class GetDeliveryLineByNumberHandler : IRequestHandler<GetDeliveryLineByNumber, DeliveryDto>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetDeliveryLineByNumberHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<DeliveryDto> Handle(GetDeliveryLineByNumber request, CancellationToken cancellationToken)
    {
        IQueryable<JobDeliveryVm> deliveryqry = (from del in _context.Deliveries
                           join user in _context.UserAccounts on del.CreatedBy equals user.Email
                           into tuser
                           from ruser in tuser.DefaultIfEmpty()
                           select new JobDeliveryVm
                           {
                               Delivery = del,
                               UserAccount = ruser
                           });


        DeliveryDto? delivery = await deliveryqry
        .ProjectTo<DeliveryDto>(_mapper.ConfigurationProvider)
        .FirstOrDefaultAsync();

        if (delivery == null)
            throw new NotFoundException("Delivery does not exists.");

        IQueryable<JobDeliveryVm> dellist = (from del in _context.DeliveryLines
                       join hdr in _context.Deliveries on del.DeliveryNumber equals hdr.DeliveryNumber
                       join job in _context.Jobs on del.JobId equals job.Id
                       into jobapp
                       from jjob in jobapp.DefaultIfEmpty()
                       join client in _context.Clients on jjob.ClientId equals client.Id
                       into clientapp
                       from capp in clientapp.DefaultIfEmpty()

                       join address in _context.ClientAddresses on new { Id = capp.Id, Default = true }
                       equals new { Id = address.ClientId, Default = address.Default }
                       into sadd
                       from subadd in sadd.DefaultIfEmpty()

                       where del.DeliveryNumber == request.Id
                       select new JobDeliveryVm
                       {
                           Delivery = hdr,
                           DeliveryLine = del,
                           Job = jjob,
                           Client = capp,
                           ClientAddress = subadd
                       });

        delivery.JobDeliveryLines = await dellist
        .ProjectTo<JobDeliveryLineDto>(_mapper.ConfigurationProvider)
        .ToListAsync();


        return delivery;
    }
}


