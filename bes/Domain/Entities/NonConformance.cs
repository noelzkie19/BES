
using System.ComponentModel.DataAnnotations.Schema;
using System;

namespace BES.Domain.Entities
{
    public class NonConformance : AuditableEntity, IHasDomainEvent
    {
        public NonConformance()
        {
            
        }
        public NonConformance(string ncrNumber, string clientNcrNumber, string recordedBy, DateTime? dateRecorded, long jobNumber,
            string natureOfNonConference, string operatord, string determineCause, string otherCause, string correctedAction,
            string correctiveNotes, int action, DateTime? actionDate, string reviewOfCorrectiveAction,
            DateTime? reviewDate, int underTakenBy , DateTime? completedDate, int ncrClearedBy , DateTime? ncrClearedDate,
            string note, string purchaseNumber, string natureNotes, string linkTo)
        {
            NcrNumber = ncrNumber;
            ClientNcrNumber = clientNcrNumber;
            RecordedBy = recordedBy;
            DateRecorded = dateRecorded;
            JobNumber = jobNumber;
            NatureOfNonConference = natureOfNonConference;
            Operator = operatord;
            DetermineCause = determineCause;
            OtherCause = otherCause;
            CorrectedAction = correctedAction;
            CorrectiveNotes = correctiveNotes;
            Action = action;
            ActionDate = actionDate;
            ReviewOfCorrectiveAction  = reviewOfCorrectiveAction;
            ReviewDate = reviewDate ;
            UnderTakenBy = underTakenBy;
            CompletedDate = completedDate;
            NcrClearedBy = ncrClearedBy;
            NcrClearedDate = ncrClearedDate;
            Note = note;
            PurchaseNumber = purchaseNumber;
            NatureNotes = natureNotes;
            LinkTo = linkTo;
        }

        public void Update(string ncrNumber, string clientNcrNumber, string recordedBy, DateTime? dateRecorded, long jobNumber,
            string natureOfNonConference, string operatord, string determineCause, string otherCause, string correctedAction,
            string correctiveNotes, int action, DateTime? actionDate, string reviewOfCorrectiveAction,
            DateTime? reviewDate, int underTakenBy , DateTime? completedDate, int ncrClearedBy , DateTime? ncrClearedDate,
            string note, string purchaseNumber, string natureNotes, string linkTo)
        {
            NcrNumber = ncrNumber;
            ClientNcrNumber = clientNcrNumber;
            RecordedBy = recordedBy;
            DateRecorded = dateRecorded;
            JobNumber = jobNumber;
            NatureOfNonConference = natureOfNonConference;
            Operator = operatord;
            DetermineCause = determineCause;
            OtherCause = otherCause;
            CorrectedAction = correctedAction;
            CorrectiveNotes = correctiveNotes;
            Action = action;
            ActionDate = actionDate;
            ReviewOfCorrectiveAction  = reviewOfCorrectiveAction;
            ReviewDate = reviewDate ;
            UnderTakenBy = underTakenBy;
            CompletedDate = completedDate;
            NcrClearedBy = ncrClearedBy;
            NcrClearedDate = ncrClearedDate;
            Note = note;
            PurchaseNumber = purchaseNumber;
            NatureNotes = natureNotes;
            LinkTo = linkTo;
        }

        public void GenerateNcrNumber(long ncrNumber)
        {
            var yr = DateTime.UtcNow.Date.Year;
            var genNcr = ncrNumber == 0 ? "0000001" : (ncrNumber + 1).ToString().PadLeft(7, '0');
            NcrNumber = $"NCR-{yr}-{genNcr}";
        }
        public string NcrNumber { get; set; } = null!;
        public string ClientNcrNumber {get; set; } = null!;
        public string RecordedBy { get; set; } = null!;
        public DateTime? DateRecorded { get; set; }
        public long JobNumber { get; set; }
        public string NatureOfNonConference { get; set; }
        public string Operator { get; set; }
        public string DetermineCause { get; set; }
        public string OtherCause { get; set; }
        public string CorrectedAction { get; set; }
        public string CorrectiveNotes { get; set; }
        public int Action { get; set; }
        public DateTime? ActionDate { get; set; }
        public string ReviewOfCorrectiveAction { get; set; }
        public DateTime? ReviewDate { get; set; }
        public int UnderTakenBy { get; set; }
        public DateTime? CompletedDate { get; set; }
        public int NcrClearedBy { get; set; }
        public DateTime? NcrClearedDate { get; set; }
        public string Note { get; set; }
        public string PurchaseNumber { get; set; }
        public string NatureNotes { get; set; }
        public string LinkTo { get; set; }
        [NotMapped]
         public List<DomainEvent> DomainEvents { get; set; } = new List<DomainEvent>();
     }
}