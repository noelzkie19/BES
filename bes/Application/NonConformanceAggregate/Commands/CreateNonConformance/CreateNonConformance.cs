using MediatR;
using BES.Application.Common.Interfaces;
using BES.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using BES.Domain.Events;

namespace BES.Application.NonConformanceAggregate.Commands.CreateNonConformance;
public class CreateNonConformance : IRequest<int>
{
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

public class CreateNonConformanceHandler : IRequestHandler<CreateNonConformance, int>
{
    private readonly IApplicationDbContext _context;

    public CreateNonConformanceHandler(IApplicationDbContext context, IIdentityService identityService)
    {
        _context = context;
    }

    public async Task<int> Handle(CreateNonConformance request, CancellationToken cancellationToken)
    {
        try
        {
            var _currentNcr = await _context.NcrNumbers.FirstOrDefaultAsync();
            var lasNcrId = _currentNcr == null ? 0 : _currentNcr.LastNcrNumber;
            // request.OtherCause = request.DetermineCause != "other" ? "" : request.OtherCause; 
      
            var newNonConformance = new NonConformance(request.NcrNumber,request.ClientNcrNumber, request.RecordedBy, request.DateRecorded,
            request.JobNumber, request.NatureOfNonConference, request.Operator, request.DetermineCause ,request.OtherCause,
            request.CorrectedAction, request.CorrectiveNotes, request.Action, request.ActionDate, request.ReviewOfCorrectiveAction, 
            request.ReviewDate ,request.IunderTakenBy, request.CompletedDate, request.NcrClearedBy , request.NcrClearedDate, request.Note, 
            request.PurchaseNumber, request.NatureNotes, request.LinkTo);

            newNonConformance.GenerateNcrNumber(lasNcrId);
            _context.NonConformances.Add(newNonConformance);
           
            newNonConformance.DomainEvents.Add(new NcrNumberEvent(new NcrNumberEventArgs
            {
                NcrNumber = lasNcrId
            }));
            await _context.SaveChangesAsync(cancellationToken);
            return newNonConformance.Id;
        }
        catch(Exception ex) 
        {
            throw ex;
        }
        

    }
}
