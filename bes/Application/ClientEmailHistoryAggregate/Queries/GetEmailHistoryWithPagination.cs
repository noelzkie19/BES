using AutoMapper;
using AutoMapper.QueryableExtensions;
using BES.Application.Common.Interfaces;
using BES.Application.Common.Models;
using MediatR;
using BES.Application.Common.Mappings;
using BES.Application.ClientEmailHistoryAggregate.Model;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;

namespace BES.Application.ClientEmailHistoryAggregate.Queries.GetEmailHistoryWithPagination;

public class GetEmailHistoryWithPagination : IRequest<PaginatedList<ClientEmailHistoryDto>>
{
    public int Skip { get; set; } = 1;
    public int Take { get; set; } = 10;
    public int ClientId { get; set; }
    public string Sort { get; set; } = string.Empty;
    public string? ReferenceNumber { get; set; } = string.Empty;    
    public string? SendName { get; set; } = string.Empty;
    public string? filePath { get; set; } = string.Empty;
}

public class GetEmailHistoryWithPaginationHandler : IRequestHandler<GetEmailHistoryWithPagination, PaginatedList<ClientEmailHistoryDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetEmailHistoryWithPaginationHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

     public async Task<PaginatedList<ClientEmailHistoryDto>> Handle(GetEmailHistoryWithPagination request, CancellationToken cancellationToken){


        var cList = (
                       from clientEmail in _context.ClientEmailHistories
                       join tFile in _context.FileStorages on clientEmail.FileStorageId equals tFile.Id
                       into fileTemp
                       from file in fileTemp.DefaultIfEmpty()
                       where clientEmail.ClientId == request.ClientId

                        join user in _context.UserAccounts on clientEmail.EmailedBy equals user.Email
                        into saddinto
                        from subaddtemp in saddinto.DefaultIfEmpty()


                       select new ClientEmailHistoryVm
                       {
                           ClientEmailHistory = clientEmail,
                           FileStorage = file,
                           SendName = subaddtemp.FirstName + " " + subaddtemp.LastName
                       });
        var clientEmailHistoryList = await cList
            .Where(item => string.IsNullOrEmpty(request.ReferenceNumber) || item.ClientEmailHistory.ReferenceNumber.Contains(request.ReferenceNumber))
            .Where(item => string.IsNullOrEmpty(request.SendName) || item.SendName.Contains(request.SendName))
            .Where(item => string.IsNullOrEmpty(request.filePath) || item.FileStorage.FileKey.Contains(request.filePath))
            .OrderBy(request.Sort)
            .ProjectTo<ClientEmailHistoryDto>(_mapper.ConfigurationProvider)
            .PaginatedListGridAsync(request.Skip, request.Take);
        return clientEmailHistoryList;
    }
}   