using AutoMapper;
using AutoMapper.QueryableExtensions;
using BES.Application.Common.Interfaces;
using BES.Application.SupplierAggregate.Model;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BES.Application.SupplierAggregate.Queries.GetSupplierAll;

public class GetSupplierAll : IRequest<IList<SupplierDto>>
{
}

public class GetSupplierAllHandler : IRequestHandler<GetSupplierAll, IList<SupplierDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    public GetSupplierAllHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    public async Task<IList<SupplierDto>> Handle(GetSupplierAll request, CancellationToken cancellationToken)
    {
        var list = (from supp in _context.Suppliers
                    join address in _context.SupplierAddresses on new { Id = supp.Id, Default = true }
                    equals new { Id = address.SupplierId, Default = address.Default }
                    into sadd
                    from subadd in sadd.DefaultIfEmpty()
                    join approval in _context.SupplierApprovals on supp.Id equals approval.SupplierId into sapp
                    from subapp in sapp.DefaultIfEmpty()
                    select new SupplierVm
                    {
                        Supplier = supp,
                        SupplierApproval = subapp,
                        SupplierAddress = subadd
                        
                    });

        var supplierlist = await list
            .ProjectTo<SupplierDto>(_mapper.ConfigurationProvider)
            .OrderBy( d => d.Name)
            .ToListAsync();

        return supplierlist;
    }
}