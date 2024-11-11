using MediatR;
using BES.Application.Common.Interfaces;
using BES.Domain.Entities;
using BES.Application.Common.Exceptions;
using BES.Application.QuoteAggregate.Model;

namespace BES.Application.QuoteAggregate.Commands.UpdateQuote;

public class UpdateQuote : IRequest<int>
{
    public int Id { get; set; }
    public int Number { get; set; }
    public int ClientId { get; set; }
    public string Description { get; set; } = string.Empty;
    public string QuoteNumber { get; private set;} = string.Empty;
    public string QuoteNumberSource { get; set; } = string.Empty;
    public string ContactName { get; set; } = string.Empty;
    public DateTime? DatePrinted { get; private set; }
    public string Status { get; private set;} = string.Empty;
    public bool Version { get; set; }
    // public int LatestVersion { get; set;}
    public bool Is30DaysFromInv { get; set; }
    public bool IsCod { get; set; }
    public bool IsDepositReceivedCOD { get; set; }
    public bool ProgressPaymentRequired { get; set; }
    public string Notes { get; set; }
    public IList<QuoteDetailDto> Details { get; set; }
    // public virtual IList<QuoteMaterialDto>? DeletedMaterials { get; set; }
}

public class UpdateQuoteHandler : IRequestHandler<UpdateQuote, int>
{
    private readonly IApplicationDbContext _context;
    public UpdateQuoteHandler(IApplicationDbContext context, IIdentityService identityService)
    {
        _context = context;
    }
    public async Task<int> Handle(UpdateQuote request, CancellationToken cancellationToken)
    {
        var quote = await _context.Quotes
                   .FindAsync(new object[] { request.Id }, cancellationToken);

        if (quote == null)
            throw new NotFoundException("Quote does not exists.");
        quote.Update(request.Number, request.Description, request.ClientId,request.QuoteNumberSource, request.DatePrinted, 
            request.Is30DaysFromInv, request.IsCod, request.IsDepositReceivedCOD, request.ProgressPaymentRequired, request.Notes);
        
        await QuoteDetailsHandler(quote.Id, request.Details, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
        return quote.Id;
    }
    public async Task QuoteDetailsHandler(int quoteNumber, IList<QuoteDetailDto> details,
        CancellationToken cancellationToken
        )
    {
        foreach (var detail in details)
        {
            if (detail.Id > 0) {
                var _detail = await _context.QuoteDetails
                    .FindAsync(new object[] { detail.Id }, cancellationToken);

                if (detail.IsDeleted)
                {
                    if (_detail != null)
                        _context.QuoteDetails.Remove(_detail);
                }
                else if (_detail != null)
                {
                    _detail.Update(detail.Description, detail.Drawing, detail.Revision, detail.Quantity, detail.CostPerUnit,
                        detail.TotalCost, detail.EstLeadTime);
                    _context.QuoteDetails.Update(_detail);
                }
            }
            else if (detail.Id == 0)
            {
                try
                {
                    if (detail != null) 
                    {
                        var quote = new QuoteDetail(detail.Description, detail.Drawing, detail.Revision, detail.Quantity, detail.CostPerUnit,
                            detail.TotalCost, detail.EstLeadTime, quoteNumber);
                        _context.QuoteDetails.Add(quote);
                    }   
                }
                catch (System.Exception ex)
                {
                    throw ex;
                }

            }
        }
    }

    // public async Task QuoteMaterialHandler(int quoteNumber, IList<QuoteMaterialDto> materials,
    //     IList<QuoteMaterialDto>? deletedMaterials,
    //     CancellationToken cancellationToken
    //     )
    // {
    //     var lastSupplier = _context.Suppliers.OrderByDescending(a => a.Id)
    //         .Select(p => p).FirstOrDefault();
    //     var supplierId = lastSupplier == null ? 1 : lastSupplier.Id;
    //     foreach (var material in materials)
    //     {
    //         if (material.Id > 0) {
    //             var _material = await _context.Materials
    //                 .FindAsync(new object[] { material.Id }, cancellationToken);
    //             if (material.IsDeleted)
    //             {
    //                 if (_material != null)
    //                     _context.Materials.Remove(_material);
    //             }
    //             else if (_material != null)
    //             {
    //                 _material.Update(quoteNumber,"string", "1mm", supplierId, "1",
    //                 DateTime.Now, DateTime.Now, material.Name ,material.Quantity,material.UnitPrice
    //                 ,material.GST,material.TotalPrice);
    //                 _context.Materials.Update(_material);
    //             }
    //         }

    //         else if (material.Id == 0)
    //         {
    //             try
    //             {
    //                 if (material != null) {
    //                 _context.Materials.Add(
    //                 new Material(quoteNumber, "string", "1mm", supplierId, "1",
    //                 DateTime.Now, DateTime.Now, material.Name, material.Quantity, material.UnitPrice
    //                 , material.GST, material.TotalPrice));
    //             }   
    //             }
    //             catch (System.Exception ex)
    //             {
    //                 throw ex;
    //             }

    //         }
    //     }
    // }
}
