using MediatR;
using BES.Application.Common.Interfaces;
using BES.Domain.Entities;
using BES.Application.DeliveryAggregate.Model;
using BES.Domain.Events;

namespace BES.Application.DeliveryAggregate.Commands.CreateDelivery;
public class CreateDelivery : IRequest<long>
{
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
    public string ContactPerson { get; set; } = string.Empty;
    public string ContactPhone { get; set; } = string.Empty;
    public IList<DeliveryLineDto> JobDeliveryLines { get; set; } = new List<DeliveryLineDto>();
}

public class CreateDeliveryHandler : IRequestHandler<CreateDelivery, long>
{
    private readonly IApplicationDbContext _context;

    public CreateDeliveryHandler(IApplicationDbContext context, IIdentityService identityService)
    {
        _context = context;
    }

    public async Task<long> Handle(CreateDelivery request, CancellationToken cancellationToken)
    {
        long deliveryNumber = GenerateDeliveryNumber();
        long deliveryLineNumber = GenereateDeliveryLineNumber();

        Delivery newDelivery = new Delivery(deliveryNumber, request.Date, request.SupplierNumber, request.Notes, request.Freight, request.ExportMyob,
            request.Street, request.City, request.State, request.PostCode, request.IsCancelled, request.ContactPerson, request.ContactPhone);

        foreach (var lines in request.JobDeliveryLines)
        {
            Job? job = _context.Jobs.FirstOrDefault(x => x.Id == lines.Id);

            int sentqty = _context.DeliveryLines.Where(x => x.JobId == lines.Id).Sum(lines => (lines.QuantitySent));
            int rembal = (job == null ? 0 : job.Quantity) - (sentqty + lines.QuantitySent);

            if (rembal < 0)
            {
                throw new Exception("Delivery not allow overruns in Job no#" + job.JobId);
            }

            deliveryLineNumber = deliveryLineNumber + 1;
            newDelivery.DeliveryLines.Add(new DeliveryLine(newDelivery.Id, lines.DeliveryLineNumber, deliveryNumber, lines.Id,
                    lines.QuantitySent, rembal));

            int qtySent = newDelivery.DeliveryLines.Where(x => x.JobId == job.Id).Sum(lines => (lines.QuantitySent));
        }

        _context.Deliveries.Add(newDelivery);

        newDelivery.DomainEvents.Add(new DeliveryCreatedEvent(new DeliveryCreatedEventArgs
        {
            deliveryNumber = deliveryNumber
        }));

        await _context.SaveChangesAsync(cancellationToken);
        return newDelivery.Id;
    }

    private long GenerateDeliveryNumber()
    {
        Delivery? lastData = _context.Deliveries.OrderByDescending(x => x.DeliveryNumber).FirstOrDefault();
        long deliveryNumber = lastData == null ? 1000 : lastData.DeliveryNumber + 1;
        return deliveryNumber;
    }

    private long GenereateDeliveryLineNumber()
    {
        DeliveryLine? lastDataLine = _context.DeliveryLines.OrderByDescending(x => x.DeliveryLineNumber).FirstOrDefault();
        long deliveryLineNumber = lastDataLine == null ? 1 : lastDataLine.DeliveryLineNumber + 1;
        return deliveryLineNumber;
    }
}