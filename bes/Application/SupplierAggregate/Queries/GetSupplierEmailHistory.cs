using AutoMapper;
using AutoMapper.QueryableExtensions;
using BES.Application.Common.Interfaces;
using BES.Application.Common.Models;
using MediatR;
using BES.Application.Common.Mappings;
using System.Linq.Dynamic.Core;
using BES.Application.SupplierAggregate.Model;
using Microsoft.EntityFrameworkCore;

namespace BES.Application.SupplierAggregate.Queries.GetSupplierEmailHistory;

public class GetSupplierEmailHistory : IRequest<List<SupplierEmailHistoryDto>>
{
    public int Skip { get; set; } = 1;
    public int Take { get; set; } = 10;
    public int SupplierId { get; set; }
    public string Sort { get; set; } = string.Empty;
    public string? ReferenceNumber { get; set; } = string.Empty;    
    public string? SendName { get; set; } = string.Empty;
    public string? filePath { get; set; } = string.Empty;

}

public class GetSupplierEmailHistoryHandler : IRequestHandler<GetSupplierEmailHistory, List<SupplierEmailHistoryDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetSupplierEmailHistoryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

     public async Task<List<SupplierEmailHistoryDto>> Handle(GetSupplierEmailHistory request, CancellationToken cancellationToken){


        var cList = (
                       from supplierEmail in _context.SupplierEmailHistories
                       join tFile in _context.FileStorages on supplierEmail.FileStorageId equals tFile.Id
                       into fileTemp
                       from file in fileTemp.DefaultIfEmpty()
                       where supplierEmail.SupplierId == request.SupplierId

                        join user in _context.UserAccounts on supplierEmail.EmailedBy equals user.Email
                        into saddinto
                        from subaddtemp in saddinto.DefaultIfEmpty()


                        select new SupplierEmailHistoryVm
                        {
                            SupplierEmailHistory = supplierEmail,
                            FileStorage = file,
                            SendName = subaddtemp.FirstName + " " + subaddtemp.LastName
                        });

        var SupplierEmailHistoryList = await cList
            .Where(item => string.IsNullOrEmpty(request.ReferenceNumber) || item.SupplierEmailHistory.ReferenceNumber.Contains(request.ReferenceNumber))
            .Where(item => string.IsNullOrEmpty(request.SendName) || item.SendName.Contains(request.SendName))
            .Where(item => string.IsNullOrEmpty(request.filePath) || item.FileStorage.FileKey.Contains(request.filePath))
            .OrderBy(request.Sort)
            .ProjectTo<SupplierEmailHistoryDto>(_mapper.ConfigurationProvider)
            .ToListAsync();

        return SupplierEmailHistoryList;
    }
}