using AutoMapper;
using AutoMapper.QueryableExtensions;
using BES.Application.Common.Interfaces;
using BES.Application.SupplierAggregate.Model;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;

namespace BES.Application.SupplierAggregate.Queries.GetSupplierPrint;

public class GetSupplierPrint : IRequest<IList<SupplierPrintDto>>
{
    public string SortBy { get; set; } = string.Empty;
    public int Supplier { get; set; }
    public DateTime DateFrom { get; set; }
    public DateTime DateTo { get; set; }
}
public class GetSupplierPrintHandler : IRequestHandler<GetSupplierPrint, IList<SupplierPrintDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    public GetSupplierPrintHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<IList<SupplierPrintDto>> Handle(GetSupplierPrint request, CancellationToken cancellationToken)
    {
        IQueryable<SupplierVm> supplierVms = (from supplier in _context.Suppliers
                                              join approval in _context.SupplierApprovals on supplier.Id equals approval.SupplierId into sapp
                                              from supplierApproval in sapp.DefaultIfEmpty()
                                              where supplierApproval != null
                                              && supplierApproval.NextDate.HasValue
                                              && supplierApproval.NextDate.Value.Date >= request.DateFrom.Date
                                              && supplierApproval.NextDate.Value.Date <= request.DateTo.Date
                                              select new SupplierVm
                                              {
                                                  Supplier = supplier,
                                                  SupplierApproval = supplierApproval
                                              });

        IQueryable<SupplierVm> sortedSupplierVms;
        switch (request.SortBy)
        {
            case "Supplier.Created asc":
                sortedSupplierVms = supplierVms.OrderBy(item => item.SupplierApproval.NextDate);
                break;
            case "Supplier.Created desc":
                sortedSupplierVms = supplierVms.OrderByDescending(item => item.SupplierApproval.NextDate);
                break;
            case "Supplier.Name asc":
                sortedSupplierVms = supplierVms.OrderBy(item => item.Supplier.Name);
                break;
            case "Supplier.Name desc":
                sortedSupplierVms = supplierVms.OrderByDescending(item => item.Supplier.Name);
                break;
            default:
                sortedSupplierVms = supplierVms.OrderBy(item => item.Supplier.Name);
                break;
        }

        List<SupplierPrintDto> results = await sortedSupplierVms
            .Where(item => request.Supplier == 0 || item.Supplier.Id == request.Supplier)
            .ProjectTo<SupplierPrintDto>(_mapper.ConfigurationProvider)
            .ToListAsync();

        return results;
    }
}