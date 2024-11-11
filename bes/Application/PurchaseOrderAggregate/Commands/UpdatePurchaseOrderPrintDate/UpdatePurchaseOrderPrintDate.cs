using MediatR;
using BES.Application.Common.Interfaces;
using BES.Domain.Entities;
using BES.Application.PurchaseOrderAggregate.Models;
using BES.Application.Common.Exceptions;

namespace BES.Application.PurchaseOrderAggregate.Commands.UpdatePurchaseOrderPrintDate;

public class UpdatePurchaseOrderPrintDate : IRequest<int>
{
    public int Id { get; set; }
    public DateTime PrintedDate { get; set; }
}

public class UpdatePurchaseOrderPrintDateHandler : IRequestHandler<UpdatePurchaseOrderPrintDate, int>
{
    private readonly IApplicationDbContext _context;

    public UpdatePurchaseOrderPrintDateHandler(IApplicationDbContext context, IIdentityService identityService)
    {
        _context = context;
    }
    public async Task<int> Handle(UpdatePurchaseOrderPrintDate request, CancellationToken cancellationToken)
    {
        try
        {
            var poHdr = await _context.Purchases
                   .FindAsync(new object[] { request.Id }, cancellationToken);

            if (poHdr == null)
                throw new NotFoundException("Purchase Order does not exists.");

            poHdr.UpdatePrintedDate(request.PrintedDate);
            _context.Purchases.Update(poHdr);
            await _context.SaveChangesAsync(cancellationToken);
            return poHdr.Id;
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }
}