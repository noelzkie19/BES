using BES.Application.Common.Exceptions;
using BES.Application.Common.Interfaces;
using BES.Domain.Entities;
using BES.Domain.Events;
using MediatR;

namespace BES.Application.QuoteAggregate.Commands.ConvertToJob;

public class ConvertToJob : IRequest<int>
{
    public int Id { get; set; }
    public int ClientId { get; set; }
    public string? Description { get; set; } = string.Empty;
    public int Quantity { get; set; }
    public int QuantityDelivered { get; set; }
    public string? OrderNumber { get; set; } = string.Empty;
    public string? DrawingNumber { get; set; } = string.Empty;
    public string? RevisionNumber { get; set; } = string.Empty;
    public string? NcrNumber { get; set; } = string.Empty;
    public DateTime? StartDate { get; set; }
    public DateTime? DueDate { get; set; }
    public DateTime? DeliveryDate { get; set; }
    public string? SetupText { get; set; } = string.Empty;
    public string? CompletedBy { get; set; } = string.Empty;
    public int JobTypeId { get; set; }

    public int Number { get; set; }
    public DateTime? Date { get; set; }
    public int EstimatedHours { get; set; }
    public decimal? EstimatedCost { get; set; }
    // public virtual Client Client { get; set; } = null!;
    public bool Delivered { get; set; }
    public string Status { get; private set; } = string.Empty;
}

public class ConvertToJobHandler : IRequestHandler<ConvertToJob, int>
{
    private readonly IApplicationDbContext _context;
    public ConvertToJobHandler(IApplicationDbContext context, IIdentityService identityService)
    {
        _context = context;
    }

    public async Task<int> Handle(ConvertToJob request, CancellationToken cancellationToken)
    {
        try
        {
            var quote = await _context.Quotes
            .FindAsync(new object[] { request.Id }, cancellationToken);
            if (quote == null)
            {
                throw new NotFoundException(nameof(Quote), request.Id);
            }
            // quote.ConvertToJob("onGoing");
            // var newQuote = new Quote(request.Number, request.Description, request.StartDate, request.DueDate, request.EstimatedHours
            // , request.Quantity, request.DrawingNumber, request.RevisionNumber, request.ClientId, request.OrderNumber
            // , request.Delivered, request.QuantityDelivered, request.JobTypeId
            // , request.SetupText, request.NcrNumber, request.CompletedBy
            // , request.DeliveryDate,"OnGoing");
            quote.DomainEvents.Add(new ConvertToJobEvent(new ConvertToJobEventArgs
            {
                ClientId = request.ClientId,
                Description = request.Description,
                Quantity = request.Quantity,
                QuantityDelivered = request.QuantityDelivered,
                OrderNumber = request.OrderNumber,
                DrawingNumber = request.DrawingNumber,
                RevisionNumber = request.RevisionNumber,
                NcrNumber = request.NcrNumber,
                StartDate = request.StartDate,
                DueDate = request.DueDate,
                DeliveryDate = request.DeliveryDate,
                SetupText = request.SetupText,
                CompletedBy = request.CompletedBy,
                JobTypeId = request.JobTypeId,
                Id = request.Id,
                EstimatedHours = request.EstimatedHours,

            }));
            await _context.SaveChangesAsync(cancellationToken);
            return quote.Id;

        }
        catch (Exception ex)
        {

            throw ex;
        }

    }
}
