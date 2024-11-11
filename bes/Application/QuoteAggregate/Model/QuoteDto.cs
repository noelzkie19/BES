using BES.Application.Common.Mappings;
using BES.Domain.Entities;
using AutoMapper;
using BES.Application.QuoteAggregate.Model;

namespace BES.Application.QuoteAggregate.Model
{
    public class QuoteDto : IMapFrom<Quote>
    {
        public int Id { get; set; }
        public int Number { get; set; }
        public int ClientId { get; set; }
        public string Description { get; set; } = string.Empty;
        public string QuoteNumber { get; set;} = string.Empty;
        public string QuoteNumberSource { get; set; } = string.Empty;
        public string ContactName { get; set; } = string.Empty;
        public DateTime? DatePrinted { get; set; }
        public string Status { get; set;} = string.Empty;
        public string? LatestVersion { get; set; }
        public string ClientName { get; set; }
        public string CreatedBy { get; set; }
        public string ContactPerson { get; set; }
        public DateTime Created { get; set; }
        public string Notes { get; set; }

        public bool Is30DaysFromInv { get; set; }
        public bool IsCod { get; set; }
        public bool IsDepositReceivedCOD { get; set; }
        public bool ProgressPaymentRequired { get; set; }
        public int? ParentId { get; set; }
        public int TotalVersion { get; set; }
        public long LatestQuoteId { get; set; }
        public IList<Material>? Materials { get; set; }
        public IList<QuoteDetailDto>? Details { get; set; }
        public IList<ClientAddress>? ClientAddresses { get; set; }
        public IList<string> QuoteVersions { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<QuoteVm, QuoteDto>()
            .ForMember(
                d => d.Id,
                opt => opt.MapFrom(s => s.Quote.Id)
            )
            .ForMember(
                d => d.ClientId,
                opt => opt.MapFrom(s => s.Client.Id)
            )
            .ForMember(
                d => d.Description,
                opt => opt.MapFrom(s => s.Quote.Description)
            )
            .ForMember(
                d => d.ClientName,
                opt => opt.MapFrom(s => s.Client.Name)
            )
            .ForMember(
                d => d.ContactPerson,
                opt => opt.MapFrom(s => s.Client.ContactPerson)
            )
            .ForMember(
                d => d.CreatedBy,
                opt => opt.MapFrom(s => s.UserAccount.FirstName + " " + s.UserAccount.LastName)
            )
            .ForMember(
                d => d.Number,
                opt => opt.MapFrom(s => s.Quote.Number)
            )
            .ForMember(
                d => d.Status,
                opt => opt.MapFrom(s => s.Quote.Status)
            )
            .ForMember(
                d => d.QuoteNumber,
                opt => opt.MapFrom(s => s.Quote.QuoteNumber)
            )
            .ForMember(
                d => d.Materials,
                opt => opt.MapFrom(s => s.Quote.Materials.Where(s => s.Deleted == null))
            )
            .ForMember(
                d => d.ClientAddresses,
                opt => opt.MapFrom(s => s.Client.ClientAddresses)
            )
            .ForMember(
                d => d.LatestVersion,
                opt => opt.MapFrom(s => s.Quote.LatestVersion)
            )
            .ForMember(
                d => d.DatePrinted,
                opt => opt.MapFrom(s => s.Quote.DatePrinted)
            ).ForMember(
                d => d.CreatedBy,
                opt => opt.MapFrom(s => s.Quote.CreatedBy)
            ).ForMember(
                d => d.Created,
                opt => opt.MapFrom(s => s.Quote.Created)
            ).ForMember(
                d => d.Notes,
                opt => opt.MapFrom(s => s.Quote.Notes)
            ).ForMember(
                d => d.IsCod,
                opt => opt.MapFrom(s => s.Quote.IsCod)
            ).ForMember(
                d => d.Is30DaysFromInv,
                opt => opt.MapFrom(s => s.Quote.Is30DaysFromInv)
            ).ForMember(
                d => d.IsDepositReceivedCOD,
                opt => opt.MapFrom(s => s.Quote.IsDepositReceivedCOD)
            ).ForMember(
                d => d.ProgressPaymentRequired,
                opt => opt.MapFrom(s => s.Quote.ProgressPaymentRequired)
            ).ForMember(
                d => d.ParentId,
                opt => opt.MapFrom(s => s.Quote.ParentId)
            ).ForMember(
                d => d.TotalVersion,
                opt => opt.MapFrom(s => s.Quote.TotalVersion)
            ).ForMember(
                d => d.LatestQuoteId,
                opt => opt.MapFrom(s => s.LatestQuoteId)
            );
        }

    }
    public class QuoteVm
    {
        public Quote Quote { get; set; }
        public Client Client { get; set; }
        public Material? Material { get; set; }
        public UserAccount UserAccount { get; set; }
        public string userName { get; set; }
        public long? jobNumber { get; set; }
        public string? jobDescription { get; set; }
        public long? LatestQuoteId { get; set; }
    }
}
