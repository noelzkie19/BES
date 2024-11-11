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

namespace BES.Application.DeliveryAggregate.Queries.GetDeliveriesReport;

public class GetDeliveriesReport : IRequest<List<DeliveryReportDto>>
{
    public string SortBy { get; set; } = string.Empty;
    public int ClientId { get; set; }
    public DateTime From { get; set; }
    public DateTime To { get; set; }
}

public class GetDeliveriesReportHandler : IRequestHandler<GetDeliveriesReport, List<DeliveryReportDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetDeliveriesReportHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<List<DeliveryReportDto>> Handle(GetDeliveriesReport request, CancellationToken cancellationToken)
    {
        try
        {

            var dellist = (from del in _context.DeliveryLines
                           join delhdr in _context.Deliveries on del.DeliveryNumber equals delhdr.DeliveryNumber
                           into hdr
                           from hdrapp in hdr.DefaultIfEmpty()
                           
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


                           where del.DeliveryNumber == del.DeliveryNumber
                           && hdrapp.Date.Date >= request.From.Date 
                           && hdrapp.Date.Date <= request.To.Date
                           select new JobDeliveryVm
                           {
                               DeliveryLine = del,
                               Delivery = hdrapp,
                               Job = jjob,
                               Client = capp,
                               ClientAddress = subadd,
                               DueDateString = ""
                           });

            var deliveryReport = await dellist
            .Where(item => request.ClientId == 0 || item.Client.Id == request.ClientId)
            .OrderBy(request.SortBy)
            .ProjectTo<DeliveryReportDto>(_mapper.ConfigurationProvider)
            .ToListAsync();


            return deliveryReport;
        }
        catch (Exception ex)
        {
            throw ex;
        }

    }
}


