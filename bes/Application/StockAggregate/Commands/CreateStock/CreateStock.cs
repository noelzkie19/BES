using MediatR;
using BES.Application.Common.Interfaces;
using BES.Domain.Entities;
using BES.Application.StockAggregate.Model;

namespace BES.Application.StockAggregate.Commands.CreateStock;
public class CreateStock : IRequest<int>
{
    public int? Id { get; set; }
    public string Drawing { get; set; } = null!;
    public string Revision { get; set; } = null!;
    public int Quantity { get; set; } 
    public int JobId { get; set; } 
    public string Notes { get; set; } = null!;
    public string Description { get; set; } = null!;
}

public class CreateStockHandler : IRequestHandler<CreateStock, int>
{
    private readonly IApplicationDbContext _context;

    public CreateStockHandler(IApplicationDbContext context, IIdentityService identityService)
    {
        _context = context;
    }

    public async Task<int> Handle(CreateStock request, CancellationToken cancellationToken)
    {
        var newStock = new Stock(request.Drawing, request.Revision,
            request.Quantity, request.JobId, request.Notes,request.Description);


        _context.Stocks.Add(newStock);

        await _context.SaveChangesAsync(cancellationToken);
        return newStock.Id;

    }
}
