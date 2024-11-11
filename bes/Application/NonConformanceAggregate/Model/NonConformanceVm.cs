using BES.Application.Common.Mappings;
using BES.Domain.Entities;

namespace BES.Application.NonConformanceAggregate.Model
{
    public class NonConformanceVm
    {
        public NonConformance NonConformance { get; set; }
        public string FilterJobNumber { get; set; } = null!;
        public string ReportAction { get; set; } = null!;
        public string ReportReviewOfCorrectiveAction { get; set; } = null!;
        public string ReportNcrClearedBy { get; set; } = null!;
        public string ReportUnderTakenBy { get; set; } = null!;
        public Client? Client { get; set; }
        public string? DisplayJobId { get; set; } = null!;
    }
}

