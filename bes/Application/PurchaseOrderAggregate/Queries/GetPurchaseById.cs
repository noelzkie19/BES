using AutoMapper;
using AutoMapper.QueryableExtensions;
using BES.Application.Common.Interfaces;
using BES.Application.PurchaseOrderAggregate.Models;
using BES.Application.Common.Models;
using MediatR;
using BES.Application.Common.Mappings;
using System.Linq.Dynamic.Core;
using Microsoft.EntityFrameworkCore;

namespace BES.Application.PurchaseOrderAggregate.Queries.GetPurchaseById;

public class GetPurchaseById : IRequest<PurchaseDto>
{
    public string Id { get; set; }
}

public class GetPurchaseByIdHandler : IRequestHandler<GetPurchaseById, PurchaseDto>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    public GetPurchaseByIdHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    public async Task<PurchaseDto> Handle(GetPurchaseById request, CancellationToken cancellationToken)
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

                    where supp.PurchaseNumber == request.Id
                    select new PurchaseVm
                    {
                        Purchase = supp,
                        SupplierAddress = subaddtemp,
                        Supplier = suptemp,
                        ConcatSupplierAddress = subaddtemp.Street + " " + subaddtemp.Suburb + ", " + subaddtemp.State,
                        FirstName = user.FirstName != null ? user.FirstName : "Administrator",
                        LastName = user.LastName != null ? user.LastName : ""
                    });

        var purchase = await list
        .ProjectTo<PurchaseDto>(_mapper.ConfigurationProvider)
        .FirstOrDefaultAsync();
        if (purchase != null)
        {
            var purchaseList = (from supp in _context.PurchaseLines
                            where supp.PurchaseNumber == purchase.PurchaseNumber
                            && supp.Deleted == null

                            select new PurchaseVm {
                                PurchaseLine = supp
                            });

            purchase.PurchaseLines = await purchaseList.ProjectTo<PurchaseLineDto>(_mapper.ConfigurationProvider).ToListAsync();
        
            if (purchase.PurchaseLines != null)
            {
                foreach (var line in purchase.PurchaseLines ) {
                    line.IsCompleted = line.Quantity == line.QuantityReceived ? true : false;
                    line.PurchaseReceipts =  await _context.PurchaseReceipts
                        .Where(x => x.PurchaseLineNumber == line.PurchaseLineNumber && x.Deleted == null)
                        .ProjectTo<PurchaseReceiptDto>(_mapper.ConfigurationProvider).ToListAsync();
                }
            }
        }

        return purchase;
    }
}