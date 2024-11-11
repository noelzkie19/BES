using AutoMapper;
using AutoMapper.QueryableExtensions;
using BES.Application.Common.Interfaces;
using BES.Application.PurchaseOrderAggregate.Models;
using BES.Application.Common.Models;
using MediatR;
using BES.Application.Common.Mappings;
using System.Linq.Dynamic.Core;
using Microsoft.EntityFrameworkCore;

namespace BES.Application.PurchaseOrderAggregate.Queries.PurchaseOrderWithPagination;

public class PurchaseOrderWithPagination : IRequest<PaginatedList<PurchaseDto>>
{
    public int Skip { get; set; } = 1;
    public int Take { get; set; } = 10;
    public string Sort { get; set; }
    public string Search { get; set; }
    public string AdvanceSearch { get; set; }
}

public class PurchaseOrderWithPaginationHandler : IRequestHandler<PurchaseOrderWithPagination, PaginatedList<PurchaseDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    public PurchaseOrderWithPaginationHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    public async Task<PaginatedList<PurchaseDto>> Handle(PurchaseOrderWithPagination request, CancellationToken cancellationToken)
    {
        var list = (from supp in _context.Purchases
                    join suppl in _context.Suppliers on supp.SupplierId equals suppl.Id
                    into supplinto from suptemp in supplinto.DefaultIfEmpty()

                    join address in _context.SupplierAddresses on new { SupplierId = supp.SupplierId, Default = true }
                    equals new { SupplierId = address.SupplierId, Default = address.Default }
                    into saddinto from subaddtemp in saddinto.DefaultIfEmpty()

                    join tUser in _context.UserAccounts on supp.CreatedBy equals tUser.Email
                    into userTemp
                    from user in userTemp.DefaultIfEmpty()

                    where supp.Deleted == null
                    select new PurchaseVm
                    {
                        Purchase = supp,
                        SupplierAddress = subaddtemp,
                        Supplier = suptemp,
                        ConcatSupplierAddress = subaddtemp.Street + " " + subaddtemp.Suburb + ", " + subaddtemp.State,
                        FirstName = user.FirstName != null ? user.FirstName : "Administrator",
                        LastName = user.LastName != null ? user.LastName : ""
                    });

        var purchasesList = await list
        .Where(request.Search is null ? "" : request.Search)
         .Where(item => string.IsNullOrEmpty(request.AdvanceSearch) 
                || item.Purchase.PurchaseNumber.StartsWith(request.AdvanceSearch)
                || item.PurchaseLine.Description.StartsWith(request.AdvanceSearch)
                || item.Supplier.Name.StartsWith(request.AdvanceSearch)
                || item.ConcatSupplierAddress.StartsWith(request.AdvanceSearch)
                || item.Supplier.Email.StartsWith(request.AdvanceSearch))
        .OrderBy(request.Sort)
        .ProjectTo<PurchaseDto>(_mapper.ConfigurationProvider)
        .PaginatedListGridAsync(request.Skip, request.Take);

        foreach(var poList in purchasesList.Items)
        {
            poList.CreatedBy = poList.FirstName + " " + poList.LastName;
            var purchaseList = (from supp in _context.PurchaseLines

                                join tJob in _context.Jobs on supp.JobId equals tJob.Id
                                into jobTemp
                                from job in jobTemp.DefaultIfEmpty()

                                join tClient in _context.Clients on job.ClientId equals tClient.Id
                                into clientTemp
                                from client in clientTemp.DefaultIfEmpty()
                        
                                where supp.PurchaseNumber == poList.PurchaseNumber
                                && supp.Deleted == null
                                // join job 
                                select new PurchaseVm {
                                    PurchaseLine = supp,
                                    ClientName = client.Name,
                                    DisplayJobId = job.JobId,
                                    JobDescription =  job.Description
                                });

            poList.PurchaseLines = await purchaseList.ProjectTo<PurchaseLineDto>(_mapper.ConfigurationProvider).ToListAsync();
            
            foreach (var line in poList.PurchaseLines ) {
                line.IsCompleted = line.Quantity == line.QuantityReceived;
                line.PurchaseReceipts =  await _context.PurchaseReceipts
                    .Where(x => x.PurchaseLineNumber == line.PurchaseLineNumber && x.Deleted == null)
                    .ProjectTo<PurchaseReceiptDto>(_mapper.ConfigurationProvider).ToListAsync();
            }
        }

        return purchasesList;
    }
}