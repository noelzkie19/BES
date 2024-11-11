using MediatR;
using BES.Application.Common.Interfaces;
using BES.Domain.Entities;
using BES.Application.PurchaseOrderAggregate.Models;
using BES.Application.Common.Exceptions;

namespace BES.Application.PurchaseOrderAggregate.Commands.CreatePurchaseOrder;

public class CreatePurchaseOrder : IRequest<Purchase>
{
    public string PurchaseNumber { get; set; } = string.Empty;
    public int SupplierId { get; set; }
    public DateTime? Date { get; set; }
    public bool Printed { get; set; }
    public DateTime? PrintedDate { get; set; }
    public decimal FreightCost { get; set; }
    public string? Notes { get; set; }
    public bool ExportMyob { get; set; }
    public string InternalNotes { get; set; } = null!;
    public string InvoiceText { get; set; } = null!;
    public string PoNotes { get; set; } = null!;
    public bool IsCourPlsReceivePays { get; set; }
    public bool IsBesArrCollection { get; set; }
    public bool IsCallReady { get; set; }
    public bool IsCallReadyQuoting { get; set; }
    public bool IsOthers { get; set; }
    public string OtherNotes { get; set; } = null!;
    public bool IsApproved { get; set; }
    public virtual IList<PurchaseLineDto> PurchaseLines { get; set; }
}

public class CreatePurchaseOrderHandler : IRequestHandler<CreatePurchaseOrder, Purchase>
{
    private readonly IApplicationDbContext _context;

    public CreatePurchaseOrderHandler(IApplicationDbContext context, IIdentityService identityService)
    {
        _context = context;
    }

    public async Task<Purchase> Handle(CreatePurchaseOrder request, CancellationToken cancellationToken)
    {
        try
        {
            var lastPOLine = _context.PurchaseLines.OrderByDescending(x => x.PurchaseLineNumber).FirstOrDefault();
            var lastPoLineId = lastPOLine == null ? 1 : lastPOLine.PurchaseLineNumber + 1;

            var poHdr = _context.Purchases.Where(d => d.PurchaseNumber == request.PurchaseNumber).FirstOrDefault();

            if (poHdr != null)
                throw new AlreadyExistsException("Purchase Number exists.");

            var purchase = new Purchase(request.PurchaseNumber, request.SupplierId, request.Date, request.Printed, request.PrintedDate, request.FreightCost, request.Notes, request.ExportMyob, request.InternalNotes,
               request.InvoiceText, request.PoNotes, request.IsCourPlsReceivePays, request.IsBesArrCollection, request.IsCallReady, request.IsCallReadyQuoting, request.IsOthers, request.OtherNotes, request.IsApproved);

            foreach (var line in request.PurchaseLines)
            {
                purchase.PurchaseLines.Add(new PurchaseLine(lastPoLineId, request.PurchaseNumber, line.Quantity, line.QuantityReceived, line.Received, line.Description, line.DueDate,
                line.CostEach, line.CostTotal, line.JobId, line.AccountNumber, line.IsIncludeGST, line.IsMaterialCertRequired, line.InvoiceNumber, line.Internal ,line.GstAmount));

                foreach (var receipt in line.PurchaseReceipts)
                {
                    var newReceipt = new PurchaseReceipt(lastPoLineId, receipt.Date, receipt.Quantity, receipt.Note, receipt.HeatNumber,
                        receipt.ReceiptMyob, receipt.PackingSlipNumber, receipt.LotNumber, receipt.GoodInspctReceivedBy);

                    _context.PurchaseReceipts.Add(newReceipt);
                }
                lastPoLineId++;
            }

            _context.Purchases.Add(purchase);

            await _context.SaveChangesAsync(cancellationToken);

            return purchase;
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }
}