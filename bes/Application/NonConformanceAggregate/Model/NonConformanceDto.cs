using AutoMapper;
using BES.Application.Common.Mappings;
using BES.Domain.Entities;

namespace BES.Application.NonConformanceAggregate.Model
{
    public class NonConformanceDto : IMapFrom<NonConformance>
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
        public string ReportAction { get; set; } = null!;
        public string ReportReviewOfCorrectiveAction { get; set; } = null!;
        public string ReportNcrClearedBy { get; set; } = null!;
        public string ReportUnderTakenBy { get; set; } = null!;
        public string PurchaseNumber { get; set; } = null!;
        public string NatureNotes { get; set; } = null!;
        public string LinkTo { get; set; } = null!;
        public string ClientName { get; set; } = null!;
        public string? DisplayJobId { get; set; } = null!;
        public int IunderTakenBy {get; set; }
        public void Mapping(Profile profile)
        {
            profile.CreateMap<NonConformanceVm, NonConformanceDto>()
            .ForMember(
                d => d.Id,
                opt => opt.MapFrom(s => s.NonConformance.Id)
            )
            .ForMember(
                d => d.NcrNumber,
                opt => opt.MapFrom(s => s.NonConformance.NcrNumber)
            )
            .ForMember(
                d => d.ClientNcrNumber,
                opt => opt.MapFrom(s => s.NonConformance.ClientNcrNumber)
            )
            .ForMember(
                d => d.RecordedBy,
                opt => opt.MapFrom(s => s.NonConformance.RecordedBy)
            )
            .ForMember(
                d => d.DateRecorded,
                opt => opt.MapFrom(s => s.NonConformance.DateRecorded)
            )
            .ForMember(
                d => d.JobNumber,
                opt => opt.MapFrom(s => s.NonConformance.JobNumber)
            )
            .ForMember(
                d => d.NatureOfNonConference,
                opt => opt.MapFrom(s => s.NonConformance.NatureOfNonConference)
            )
            .ForMember(
                d => d.Operator,
                opt => opt.MapFrom(s => s.NonConformance.Operator)
            )
            .ForMember(
                d => d.DetermineCause,
                opt => opt.MapFrom(s => s.NonConformance.DetermineCause)
            )
            .ForMember(
                d => d.OtherCause,
                opt => opt.MapFrom(s => s.NonConformance.OtherCause)
            )
            .ForMember(
                d => d.CorrectedAction,
                opt => opt.MapFrom(s => s.NonConformance.CorrectedAction)
            )
            .ForMember(
                d => d.CorrectiveNotes,
                opt => opt.MapFrom(s => s.NonConformance.CorrectiveNotes)
            )
            .ForMember(
                d => d.Action,
                opt => opt.MapFrom(s => s.NonConformance.Action)
            )
            .ForMember(
                d => d.ActionDate,
                opt => opt.MapFrom(s => s.NonConformance.ActionDate)
            )
            .ForMember(
                d => d.ReviewOfCorrectiveAction,
                opt => opt.MapFrom(s => s.NonConformance.ReviewOfCorrectiveAction)
            )
            .ForMember(
                d => d.IunderTakenBy,
                opt => opt.MapFrom(s => s.NonConformance.UnderTakenBy)
            )
            .ForMember(
                d => d.ReviewDate,
                opt => opt.MapFrom(s => s.NonConformance.ReviewDate)
            )
            .ForMember(
                d => d.UnderTakenBy,
                opt => opt.MapFrom(s => s.NonConformance.UnderTakenBy)
            )
            .ForMember(
                d => d.CompletedDate,
                opt => opt.MapFrom(s => s.NonConformance.CompletedDate)
            )
            .ForMember(
                d => d.NcrClearedBy,
                opt => opt.MapFrom(s => s.NonConformance.NcrClearedBy)
            )
            .ForMember(
                d => d.NcrClearedDate,
                opt => opt.MapFrom(s => s.NonConformance.NcrClearedDate)
            )
            .ForMember(
                d => d.PurchaseNumber,
                opt => opt.MapFrom(s => s.NonConformance.PurchaseNumber)
            )
            .ForMember(
                d => d.NatureNotes,
                opt => opt.MapFrom(s => s.NonConformance.NatureNotes)
            )
            .ForMember(
                d => d.Note,
                opt => opt.MapFrom(s => s.NonConformance.Note)
            )
            .ForMember(
                d => d.ReportAction,
                opt => opt.MapFrom(s => s.ReportAction)
            )
            .ForMember(
                d => d.ReportReviewOfCorrectiveAction,
                opt => opt.MapFrom(s => s.ReportReviewOfCorrectiveAction)
            )
            .ForMember(
                d => d.ReportNcrClearedBy,
                opt => opt.MapFrom(s => s.ReportNcrClearedBy)
            ).ForMember(
                d => d.ReportUnderTakenBy,
                opt => opt.MapFrom(s => s.ReportUnderTakenBy)
            ).ForMember(
                d => d.LinkTo,
                opt => opt.MapFrom(s => s.NonConformance.LinkTo)
            ).ForMember(
                d => d.DisplayJobId,
                opt => opt.MapFrom(s => s.DisplayJobId)
            ).ForMember(
                d => d.ClientName,
                opt => opt.MapFrom(s => (s == null || s.Client == null)
                ? null : (string?)s.Client.Name)
            ); 
            
            
        }
    }
}