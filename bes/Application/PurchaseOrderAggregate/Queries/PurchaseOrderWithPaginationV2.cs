using AutoMapper;
using AutoMapper.QueryableExtensions;
using BES.Application.Common.Interfaces;
using BES.Application.PurchaseOrderAggregate.Models;
using BES.Application.Common.Models;
using MediatR;
using BES.Application.Common.Mappings;
using System.Linq.Dynamic.Core;
using Microsoft.EntityFrameworkCore;
using BES.Domain.Entities;

namespace BES.Application.PurchaseOrderAggregate.Queries.PurchaseOrderWithPaginationV2;

public class PurchaseOrderWithPaginationV2 : IRequest<PaginatedList<PurchaseLineDto>>
{
    public int Skip { get; set; } = 1;
    public int Take { get; set; } = 10;
    public string Sort { get; set; }
    public string Search { get; set; }
    public string AdvanceSearch { get; set; }
    public string PrintState { get; set; }
    public string OrderStatus { get; set; }
    public string Internal { get; set; }
}

public class PurchaseOrderWithPaginationV2Handler : IRequestHandler<PurchaseOrderWithPaginationV2, PaginatedList<PurchaseLineDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public PurchaseOrderWithPaginationV2Handler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<PaginatedList<PurchaseLineDto>> Handle(PurchaseOrderWithPaginationV2 request, CancellationToken cancellationToken)
    {
        IQueryable<PurchaseVm> list = from poline in _context.PurchaseLines
                                      join supp in _context.Purchases on poline.PurchaseNumber equals supp.PurchaseNumber
                                      join suppl in _context.Suppliers on supp.SupplierId equals suppl.Id
                                      into supplinto
                                      from suptemp in supplinto.DefaultIfEmpty()

                                      join job in _context.Jobs on poline.JobId equals job.Id
                                      into jbinto
                                      from jbtemp in jbinto.DefaultIfEmpty()

                                      where supp.Deleted == null
                                      && poline.Deleted == null

                                      select new PurchaseVm
                                      {
                                          PurchaseLine = poline,
                                          Purchase = supp,
                                          DisplayJobId = jbtemp.JobId,
                                          Supplier = suptemp,
                                      };


        PaginatedList<PurchaseLineDto> purchasesList = await list
        .Where(request.Search is null ? "" : request.Search)
        .Where(item => string.IsNullOrEmpty(request.AdvanceSearch)
                || item.Purchase.PurchaseNumber.StartsWith(request.AdvanceSearch)
                || item.PurchaseLine.Description.StartsWith(request.AdvanceSearch)
                || item.Supplier.Name.StartsWith(request.AdvanceSearch)
                || item.DisplayJobId.StartsWith(request.AdvanceSearch)
                || item.Supplier.Email.StartsWith(request.AdvanceSearch))
        .Where(item => request.PrintState == "unchecked" ? item.Purchase.PrintedDate == null : true)
        .Where(item => request.PrintState == "checked" ? item.Purchase.PrintedDate != null : true)
        .Where(item => request.OrderStatus == "Outstanding" ?
        !(item.PurchaseLine.PurchaseReceipts != null &&
        item.PurchaseLine.PurchaseReceipts.Any() &&
        item.PurchaseLine.PurchaseReceipts.Sum(x => x.Quantity) >= item.PurchaseLine.Quantity)
        : true)
        .Where(item => request.OrderStatus == "Completed" ?
        item.PurchaseLine.PurchaseReceipts != null &&
        item.PurchaseLine.PurchaseReceipts.Any() &&
        item.PurchaseLine.PurchaseReceipts.Sum(x => x.Quantity) >= item.PurchaseLine.Quantity
        : true)
        .Where(item => request.Internal == "unchecked" ? !item.PurchaseLine.Internal : true)
        .Where(item => request.Internal == "checked" ? item.PurchaseLine.Internal : true)
        .OrderBy(request.Sort.Contains("Purchase.IsCompleted") ? "Purchase.Created asc" : request.Sort)
        .ProjectTo<PurchaseLineDto>(_mapper.ConfigurationProvider)
        .PaginatedListGridAsync(request.Skip, request.Take);

        foreach (PurchaseLineDto item in purchasesList.Items)
        {
            item.IsCompleted = item.PurchaseReceipts != null && item.PurchaseReceipts.Any() && item.PurchaseReceipts.Sum(x => x.Quantity) >= item.Quantity;
        }

         // Add an additional OrderBy clause for item.IsCompleted
        if (request.Sort.Contains("Purchase.IsCompleted"))
        {
             List<PurchaseLineDto> sortedItems;
            if (request.Sort.Contains("asc"))
            {
               sortedItems  = purchasesList.Items.OrderBy(item => item.IsCompleted ? 1 : 0).ToList();
            }
            else
            {
               sortedItems  = purchasesList.Items.OrderByDescending(item => item.IsCompleted ? 1 : 0).ToList();
            }

            purchasesList = new PaginatedList<PurchaseLineDto>(sortedItems, purchasesList.TotalCount, request.Skip, request.Take);
        }
        return purchasesList;
    }
}