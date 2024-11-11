using AutoMapper;
using AutoMapper.QueryableExtensions;
using BES.Application.Common.Interfaces;
using BES.Application.Common.Models;
using MediatR;
using BES.Application.Common.Mappings;
using System.Linq.Dynamic.Core;
using Microsoft.EntityFrameworkCore;
using BES.Application.JobAggregate.Model;
using BES.Application.JobAggregate.Models;

namespace BES.Application.JobAggregate.Queries.GetJobPurchaseOrder;

public class GetJobPurchaseOrder : IRequest<List<JobPurchaseOrderDto>>
{
    public int JobId { get; set; }
    public int? ParentJobNumber { get; set; }
    public int? JobidSource { get; set; }
}

public class GetJobPurchaseOrderHandler : IRequestHandler<GetJobPurchaseOrder, List<JobPurchaseOrderDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetJobPurchaseOrderHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<List<JobPurchaseOrderDto>> Handle(GetJobPurchaseOrder request, CancellationToken cancellationToken)
    {
        var poItems = (from poLine in _context.PurchaseLines
                        join poHdr in _context.Purchases on poLine.PurchaseNumber equals poHdr.PurchaseNumber

                        join user in _context.UserAccounts on poHdr.CreatedBy equals user.Email
                        into saddinto
                        from subaddtemp in saddinto.DefaultIfEmpty()

                        join supp in _context.Suppliers on poHdr.SupplierId equals supp.Id

                        where (poLine.JobId == request.JobId
                        // || poLine.JobId == request.ParentJobNumber
                        || poLine.JobId == request.JobidSource)
                        && poLine.JobId != null
                        && poLine.Deleted == null
                        select new JobVm {
                            PurchaseLine = poLine,
                            Purchase = poHdr,
                            Supplier = supp,
                            UserAccount = subaddtemp
                        }); 

        var jobList = await poItems
            .ProjectTo<JobPurchaseOrderDto>(_mapper.ConfigurationProvider)
            .ToListAsync();

        return jobList;
    }
}
