using MediatR;
using BES.Application.Common.Interfaces;
using BES.Domain.Entities;
using BES.Application.DeliveryAggregate.Model;
using BES.Application.Common.Exceptions;

namespace BES.Application.DeliveryAggregate.Commands.UpdateDelivery;
public class UpdateDelivery : IRequest<int>
{
    public int Id { get; set; }
    public long DeliveryNumber { get; set; }
    public DateTime Date { get; set; }
    public long SupplierNumber { get; set; }
    public string Notes { get; set; } = string.Empty;
    public decimal Freight { get; set; }
    public bool ExportMyob { get; set; }
    public string Street { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string State { get; set; } = string.Empty;
    public string PostCode { get; set; } = string.Empty;
    public bool IsCancelled { get; set; }
    public List<DeliveryLineDto> DeliveryLines = new List<DeliveryLineDto>();
}

public class UpdateDeliveryHandler : IRequestHandler<UpdateDelivery, int>
{
    private readonly IApplicationDbContext _context;

    public UpdateDeliveryHandler(IApplicationDbContext context, IIdentityService identityService)
    {
        _context = context;
    }

    public async Task<int> Handle(UpdateDelivery request, CancellationToken cancellationToken)
    {
        var delivery = await _context.Deliveries
            .FindAsync(new object[] { request.Id }, cancellationToken);

        if (delivery == null)
            throw new NotFoundException("Delivery does not exists.");

        delivery.Update(request.DeliveryNumber, request.Date, request.SupplierNumber, request.Notes, request.Freight, request.ExportMyob,
            request.Street, request.City, request.State, request.PostCode, request.IsCancelled);

        await DeliveriesLinesHandler(request.Id, request.DeliveryLines, cancellationToken);

        _context.Deliveries.Add(delivery);
        await _context.SaveChangesAsync(cancellationToken);
        return delivery.Id;

    }

    public async Task DeliveriesLinesHandler(int deliveryId, List<DeliveryLineDto> deliveryLines, CancellationToken cancellationToken)
    {
         var lastDataLine = _context.DeliveryLines.OrderByDescending(x => x.DeliveryLineNumber).FirstOrDefault();

        foreach (var deliveryline in deliveryLines)
        {
            if (deliveryline.Id > 0) 
            {
                var _delivery = await _context.DeliveryLines
                    .FindAsync(new object[] { deliveryline.Id }, cancellationToken);

                if (_delivery is null) {
                    return;
                }

                if (deliveryline.IsDeleted)
                {
                    _context.DeliveryLines.Remove(_delivery);
                } 
                else 
                {
                   _delivery.Update(_delivery.DeliveryId, _delivery.DeliveryLineNumber, _delivery.DeliveryNumber, _delivery.JobId, _delivery.QuantitySent);
                }
            }
            else if (deliveryline.Id == 0)
            {
                _context.DeliveryLines.Add(new DeliveryLine(deliveryId, deliveryline.DeliveryLineNumber, deliveryline.DeliveryNumber, deliveryline.Id,
                    deliveryline.QuantitySent, 0));
            }

            // //update job delivery quantity
            // var job = _context.Jobs.FirstOrDefault(x => x.Id == deliveryline.JobId);
            // var qtySent = _context.DeliveryLines.Where(x => x.JobId == job.Id).Sum(lines => (lines.QuantitySent));
            // job.UpdateDeliveryQuantity(qtySent);
        }

   
       
    }

    }