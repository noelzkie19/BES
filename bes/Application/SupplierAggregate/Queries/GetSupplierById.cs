using AutoMapper;
using AutoMapper.QueryableExtensions;
using BES.Application.Common.Interfaces;
using BES.Application.SupplierAggregate.Model;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BES.Application.SupplierAggregate.Queries.GetSupplierById;

public class GetSupplierById : IRequest<SupplierDto>
{
    public int Id { get; set; }
}

public class GetSupplierByIdHandler : IRequestHandler<GetSupplierById, SupplierDto>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetSupplierByIdHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<SupplierDto> Handle(GetSupplierById request, CancellationToken cancellationToken)
    {
        IQueryable<SupplierVm> list = (from supp in _context.Suppliers
                                       join address in _context.SupplierAddresses on new { Id = supp.Id, Default = true }
                                       equals new { Id = address.SupplierId, Default = address.Default }
                                       into sadd
                                       from subadd in sadd.DefaultIfEmpty()
                                       join approval in _context.SupplierApprovals on supp.Id equals approval.SupplierId into sapp
                                       from subapp in sapp.DefaultIfEmpty()
                                       where supp.Id == request.Id
                                       select new SupplierVm
                                       {
                                           Supplier = supp,
                                           SupplierApproval = subapp,
                                           SupplierAddress = subadd

                                       });

        SupplierDto? supplierlist = await list
            .ProjectTo<SupplierDto>(_mapper.ConfigurationProvider)
            .FirstOrDefaultAsync();

        return supplierlist;
    }
}
