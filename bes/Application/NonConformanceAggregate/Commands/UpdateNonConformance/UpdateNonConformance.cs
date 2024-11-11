using MediatR;
using BES.Application.Common.Interfaces;
using BES.Application.Common.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace BES.Application.NonConformanceAggregate.Commands.UpdateNonConformance;
public class UpdateNonConformance : IRequest<int>
{   
    public int Id { get; set; }
    public string NcrNumber { get; set; } = null!;
    public string ClientNcrNumber { get; set; } = null!;
    public string RecordedBy { get; set; } = null!;
    public DateTime? DateRecorded { get; set; }
    public long JobNumber { get; set; }
    public string NatureOfNonConference { get; set; } = null!;
    public string Operator { get; set; } 
    public string DetermineCause { get; set; } = null!;
    public string OtherCause { get; set; } = null!;
    public string CorrectedAction { get; set; } = null!;
    public string CorrectiveNotes { get; set; } = null!;
    public int Action { get; set; }
    public DateTime? ActionDate { get; set; }
    public string ReviewOfCorrectiveAction { get; set; } 
    public DateTime? ReviewDate { get; set; }
    public int UnderTakenBy { get; set; } 
    public DateTime? CompletedDate { get; set; }
    public int NcrClearedBy { get; set; } 
    public DateTime? NcrClearedDate { get; set; } 
    public string Note { get; set; } = null!;
    public string PurchaseNumber { get; set; }
    public string NatureNotes { get; set; }
    public string LinkTo { get; set; }
    public int IunderTakenBy { get; set; } 
}

public class UpdateNonConformanceHandler : IRequestHandler<UpdateNonConformance, int>
{
    private readonly IApplicationDbContext _context;

    public UpdateNonConformanceHandler(IApplicationDbContext context)
    {
        _context = context;
    }
    public async Task<int> Handle(UpdateNonConformance request, CancellationToken cancellationToken)
    {
        try {
            var nonConformance = await _context.NonConformances
                    .FindAsync(new object[] { request.Id }, cancellationToken);

            if (nonConformance == null) 
                throw new NotFoundException("Non Conformance does not exists.");

            // request.OtherCause = request.DetermineCause != "other" ? "" : request.OtherCause; 

            nonConformance.Update(request.NcrNumber,request.ClientNcrNumber, request.RecordedBy, request.DateRecorded,
                    request.JobNumber, request.NatureOfNonConference, request.Operator, request.DetermineCause ,request.OtherCause,
                    request.CorrectedAction, request.CorrectiveNotes, request.Action, request.ActionDate ,request.ReviewOfCorrectiveAction,
                    request.ReviewDate ,request.IunderTakenBy, request.CompletedDate, request.NcrClearedBy, request.NcrClearedDate, request.Note,
                    request.PurchaseNumber, request.NatureNotes, request.LinkTo);
            _context.NonConformances.Update(nonConformance);
            await _context.SaveChangesAsync(cancellationToken);

            return nonConformance.Id;
        } catch (Exception ex){
            throw ex;
        }
      
    }
}
