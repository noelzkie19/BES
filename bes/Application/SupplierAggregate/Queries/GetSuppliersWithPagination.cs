using AutoMapper;
using AutoMapper.QueryableExtensions;
using BES.Application.Common.Interfaces;
using BES.Application.Common.Models;
using MediatR;
using BES.Application.Common.Mappings;
using BES.Application.SupplierAggregate.Model;
using System.Linq.Dynamic.Core;
using Microsoft.EntityFrameworkCore;

namespace BES.Application.SupplierAggregate.Queries.GetSuppliersWithPagination;

public class GetSuppliersWithPagination : IRequest<PaginatedList<SupplierDto>>
{
    public int Skip { get; set; } = 1;
    public int Take { get; set; } = 10;
    public string Sort { get; set; } = string.Empty;
    public string? Search { get; set; } = string.Empty;
    public string? AdvanceSearch { get; set; } = string.Empty;
}

public class GetSuppliersWithPaginationHandler : IRequestHandler<GetSuppliersWithPagination, PaginatedList<SupplierDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetSuppliersWithPaginationHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<PaginatedList<SupplierDto>> Handle(GetSuppliersWithPagination request, CancellationToken cancellationToken)
    {

        IQueryable<SupplierVm> list = (from supp in _context.Suppliers
                    join address in _context.SupplierAddresses on new { Id = supp.Id, Default = true } 
                    equals new { Id = address.SupplierId, Default = address.Default }
                    into sadd from subadd in sadd.DefaultIfEmpty()
                    join approval in _context.SupplierApprovals on supp.Id equals approval.SupplierId into sapp
                    from subapp in sapp.DefaultIfEmpty()
                    select new SupplierVm
                    {
                        Supplier = supp,
                        SupplierApproval = subapp,
                        SupplierAddress = subadd
                    });


        PaginatedList<SupplierDto> supplierlist = await list
            .Where(request.Search is null ? "" : request.Search)
            .Where(item => string.IsNullOrEmpty(request.AdvanceSearch)
            || (" " + item.Supplier.Name).Contains(" " + request.AdvanceSearch)
            || (" " + item.Supplier.ContactPerson).Contains(" " + request.AdvanceSearch)
            || (" " + item.SupplierAddress.Suburb).Contains(" " + request.AdvanceSearch)
            || (" " + item.SupplierAddress.Street).Contains(" " + request.AdvanceSearch)
            || (" " + item.SupplierAddress.PostCode).Contains(" " + request.AdvanceSearch)
            || (" " + item.Supplier.Phone).Contains(" " + request.AdvanceSearch))
            .OrderBy(request.Sort)
            .ProjectTo<SupplierDto>(_mapper.ConfigurationProvider)
            .PaginatedListGridAsync(request.Skip, request.Take);

        return supplierlist;
    }
}


