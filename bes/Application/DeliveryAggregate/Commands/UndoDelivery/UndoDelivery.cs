using BES.Application.Common.Exceptions;
using BES.Application.Common.Interfaces;
using BES.Domain.Entities;
using MediatR;
using BES.Domain.Events;

namespace BES.Application.DeliveryAggregate.Commands.UndoDelivery;

public class UndoDelivery : IRequest
{
    public int Id { get; set; }
}


public class UndoDeliveryHandler : IRequestHandler<UndoDelivery>
{
    private readonly IApplicationDbContext _context;
    public UndoDeliveryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(UndoDelivery request, CancellationToken cancellationToken)
    {

        try {
            var entity = _context.Deliveries.Where(x => x.DeliveryNumber == request.Id).FirstOrDefault();

            if (entity == null)
            {
                throw new NotFoundException("Delivery not exists.");
            }
            
            _context.Deliveries.Remove(entity);

            var lines = _context.DeliveryLines.Where(x => x.DeliveryNumber == entity.DeliveryNumber);
            foreach (var deliveryline in lines)
            {
                var job = _context.Jobs.FirstOrDefault(x => x.Id == deliveryline.JobId);
                var qtySent = job.QuantityDelivered - deliveryline.QuantitySent;
                var isDelivered = job.Quantity <= qtySent;
                job.UpdateDeliveryQuantity(qtySent, isDelivered);
                _context.Jobs.Update(job);
            }
            _context.DeliveryLines.RemoveRange(lines);
            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }catch (Exception ex){
            throw ex;
        }
      
    }
}
