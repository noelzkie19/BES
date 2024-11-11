using System.ComponentModel.DataAnnotations.Schema;

namespace BES.Domain.Entities
{
    public class Quote : AuditableEntity, IHasDomainEvent
    {
        public Quote() {}
 
        public Quote(int number, string description, int clientId, string status, string quoteNumber, string quoteNumberSource, string? latestVersion,
            bool is30DaysFromInv, bool isCod, bool isDepositReceivedCOD, bool progressPaymentRequired, string notes)
        {
            Description = description;
            ClientId = clientId;
            Status = status;
            QuoteNumber = quoteNumber;
            QuoteNumberSource = quoteNumberSource;
            LatestVersion = latestVersion;
            Number = number;
            Is30DaysFromInv = is30DaysFromInv;
            IsCod = isCod;
            IsDepositReceivedCOD = isDepositReceivedCOD;
            ProgressPaymentRequired = progressPaymentRequired;
            Notes = notes;
            TotalVersion = 0;
            DateLatestVersion = DateTime.UtcNow;
        }
        public void Update(int number, string description, int clientId, string quoteNumberSource, DateTime? datePrinted,
            bool is30DaysFromInv, bool isCod, bool isDepositReceivedCOD, bool progressPaymentRequired, string notes)
        {
            Description = description;
            ClientId = clientId;
            QuoteNumberSource = quoteNumberSource;
            DatePrinted = datePrinted;
            Number = number;
            Is30DaysFromInv = is30DaysFromInv;
            IsCod = isCod;
            IsDepositReceivedCOD = isDepositReceivedCOD;
            ProgressPaymentRequired = progressPaymentRequired;
            Notes = notes;
        }
        public void Confirm(string status) {
            Status = status;
        }
        public void NewVersion(string newQuoteNumber, int number) {
            Status = "On Going";
            DatePrinted = null;
            QuoteNumberSource = QuoteNumber;
            QuoteNumber = newQuoteNumber;
            ParentId = ParentId == null ? Id : ParentId;
            Number = number;
            LatestVersion = null;
            Id = 0;
        }

        public void SetTotalVersion(int totalVersion)
        {
            TotalVersion = totalVersion;
        }

        public void PrintQuote(string status) {
            Status = status;
            DatePrinted = DateTime.UtcNow;
        }

         public void QuoteDatePrint() {
            DatePrinted = DateTime.Now;
        }

        public void ConvertToJob(string status) {
            Status = status;
        }
        public void UpdateLatestVersion(string? latestVersion) {
            LatestVersion = latestVersion;
        }
        public void UpdateDateLatestVersion() {
            DateLatestVersion = DateTime.Now;
        }
        
        
        public void CopyQuote(string newQuoteNumber, int number) {
            Status = "On Going";
            DatePrinted = null;
            QuoteNumberSource = "";
            QuoteNumber = newQuoteNumber;
            LatestVersion  = newQuoteNumber;
            ParentId = null;
            Number = number;
            TotalVersion = 0;
            Id = 0;
        }


        public int Number { get; private set; }
        public int ClientId { get; private set; }
        public string Description { get; private set; } = string.Empty;
        public string QuoteNumber { get; private set;} = string.Empty;
        public string QuoteNumberSource { get; private set; } = string.Empty;
        public int? ParentId { get; private set; }
        public string ContactName { get; private set; } = string.Empty;
        public DateTime? DatePrinted { get; private set; }
        public string Status { get; private set;} = string.Empty;
        public string? LatestVersion { get; private set; }
        public bool Is30DaysFromInv { get; private set; }
        public bool IsCod { get; private set; }
        public bool IsDepositReceivedCOD { get; private set; }
        public bool ProgressPaymentRequired { get; private set; }
        public string Notes { get; private set;} = string.Empty;
        public int TotalVersion { get; private set;}
        public DateTime DateLatestVersion { get; private set;}
        public virtual Client Client { get; private set; } = null!;
        public virtual ICollection<Material> Materials  { get; set; }
        public virtual ICollection<QuoteDetail> QuoteDetails { get; private set; }
        [NotMapped]
        public List<DomainEvent> DomainEvents { get; set; } = new List<DomainEvent>();

    }

}
