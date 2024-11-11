using MediatR;
using BES.Application.Common.Interfaces;
using BES.Domain.Entities;
using BES.Application.StockAggregate.Model;
using BES.Application.Common.Exceptions;

namespace BES.Application.StockAggregate.Commands.UpdateStock;

public class UpdateStock : IRequest<int>
{
    public int Id { get; set; } 
    public string Drawing { get; set; } = string.Empty;
    public string Revision { get; set; } = string.Empty;
    public int Quantity { get; set; } = 0; 
    public int JobId { get; set; }
    public string Notes { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;

}

public class UpdateStockHandler : IRequestHandler<UpdateStock, int>
{
    private readonly IApplicationDbContext _context;

    public UpdateStockHandler(IApplicationDbContext context, IIdentityService identityService)
    {
        _context = context;
    }

    public async Task<int> Handle(UpdateStock request, CancellationToken cancellationToken)
    {
        var stock = await _context.Stocks
                   .FindAsync(new object[] { request.Id }, cancellationToken);

        if (stock == null) 
            throw new NotFoundException("Stock does not exists.");
            
        stock.Update(request.Drawing, request.Revision,
            request.Quantity, request.Notes,request.Description, request.JobId);
        _context.Stocks.Update(stock);

        await _context.SaveChangesAsync(cancellationToken);
        return stock.Id;
    }
    
}
