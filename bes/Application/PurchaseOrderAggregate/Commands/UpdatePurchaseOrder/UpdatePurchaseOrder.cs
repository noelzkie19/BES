using MediatR;
using BES.Application.Common.Interfaces;
using BES.Domain.Entities;
using BES.Application.PurchaseOrderAggregate.Models;
using BES.Application.Common.Exceptions;

namespace BES.Application.PurchaseOrderAggregate.Commands.UpdatePurchaseOrder;

public class UpdatePurchaseOrder : IRequest<int>
{
    public int Id { get; set; }
    public string PurchaseNumber { get; set; }
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

public class UpdatePurchaseOrderHandler : IRequestHandler<UpdatePurchaseOrder, int>
{
    private readonly IApplicationDbContext _context;

    public UpdatePurchaseOrderHandler(IApplicationDbContext context, IIdentityService identityService)
    {
        _context = context;
    }
    public async Task<int> Handle(UpdatePurchaseOrder request, CancellationToken cancellationToken)
    {
        try
        {
            var lastPOLine = _context.PurchaseLines.OrderByDescending(x => x.PurchaseLineNumber).FirstOrDefault();
            var lastPoLineId = lastPOLine == null ? 0 : lastPOLine.PurchaseLineNumber + 1;

            var poHdr = await _context.Purchases
                   .FindAsync(new object[] { request.Id }, cancellationToken);

            if (poHdr == null)
                throw new NotFoundException("Purchase Order does not exists.");

            poHdr.Update(request.SupplierId, request.Date, request.Printed, request.PrintedDate, request.FreightCost, request.Notes, request.ExportMyob, request.InternalNotes,
               request.InvoiceText, request.PoNotes, request.IsCourPlsReceivePays, request.IsBesArrCollection, request.IsCallReady, request.IsCallReadyQuoting, request.IsOthers, request.OtherNotes, request.IsApproved);

            foreach (var line in request.PurchaseLines)
            {
                if (line.IsDeleted) 
                {
                    var poLine = await _context.PurchaseLines
                                    .FindAsync(new object[] { line.Id }, cancellationToken);

                    if (poLine is not null)
                        _context.PurchaseLines.Remove(poLine);
                }
                else if (line.Id > 0) 
                {
                    var poLine = await _context.PurchaseLines
                                    .FindAsync(new object[] { line.Id }, cancellationToken);

                    if (poLine is not null) {
                        poLine.update(poLine.PurchaseLineNumber, line.Quantity, line.QuantityReceived, line.Received, line.Description, line.DueDate,
                                 line.CostEach, line.CostTotal, line.JobId, line.AccountNumber, line.IsIncludeGST, line.IsMaterialCertRequired, line.InvoiceNumber, 
                                 line.Internal, line.GstAmount);
                        _context.PurchaseLines.Update(poLine);

                        foreach (var receipt in line.PurchaseReceipts)
                        {
                            var newReceipt = new PurchaseReceipt(receipt.PurchaseLineNumber, receipt.Date, receipt.Quantity, receipt.Note, receipt.HeatNumber,
                                receipt.ReceiptMyob, receipt.PackingSlipNumber, receipt.LotNumber, receipt.GoodInspctReceivedBy);

                            _context.PurchaseReceipts.Add(newReceipt);
                        }
                    }
                }
                else
                {
                    _context.PurchaseLines.Add(new PurchaseLine(lastPoLineId, request.PurchaseNumber, line.Quantity, line.QuantityReceived, line.Received, line.Description, line.DueDate,
                                 line.CostEach, line.CostTotal, line.JobId, line.AccountNumber, line.IsIncludeGST, line.IsMaterialCertRequired, line.InvoiceNumber, line.Internal, 
                                 line.GstAmount));

                    foreach (var receipt in line.PurchaseReceipts)
                    {
                        var newReceipt = new PurchaseReceipt(lastPoLineId, receipt.Date, receipt.Quantity, receipt.Note, receipt.HeatNumber,
                            receipt.ReceiptMyob, receipt.PackingSlipNumber, receipt.LotNumber, receipt.GoodInspctReceivedBy);

                        _context.PurchaseReceipts.Add(newReceipt);
                    }

                    lastPoLineId++;
                }
            }
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