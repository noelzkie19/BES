using AutoMapper;
using BES.Application.Common.Mappings;
using BES.Domain.Entities;

namespace BES.Application.DeliveryAggregate.Model
{
    public class DeliveryDto : IMapFrom<Delivery>
    {        
        public long DeliveryNumber { get; set; }
        public DateTime Date { get; set; }
        public long SupplierNumber { get; set; }
        public string? Notes { get; set; }
        public decimal Freight { get; set; }
        public bool ExportMyob { get; set; }
        public string? Street { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public string? PostCode { get; set; }
        public bool IsCancelled { get; set; }
        public string CreatedBy { 
            get
            {
                return this.UserAccount != null ?
                this.UserAccount.FirstName + " " + this.UserAccount.LastName :
                "Administrator";
            } 
        }
        public int TotalQuantityDelivered
        {
            get
            {
                return this.JobDeliveryLines.Sum(lines => (lines.QuantitySent));
            }
        }

        public List<JobDeliveryLineDto> JobDeliveryLines { get; set; } = null!;
        public UserAccount UserAccount { get; set; } = null!;

        public void Mapping(Profile profile)
        {
            profile.CreateMap<JobDeliveryVm, DeliveryDto>()
            .ForMember(
                d => d.DeliveryNumber,
                opt => opt.MapFrom(s => s.Delivery.DeliveryNumber)
            ).ForMember(
                d => d.Date,
                opt => opt.MapFrom(s => s.Delivery.Date)
            ).ForMember(
                d => d.SupplierNumber,
                opt => opt.MapFrom(s => s.Delivery.SupplierNumber)
            ).ForMember(
                d => d.Notes,
                opt => opt.MapFrom(s => s.Delivery.Notes)
            ).ForMember(
                d => d.Freight,
                opt => opt.MapFrom(s => s.Delivery.Freight)
            ).ForMember(
                d => d.ExportMyob,
                opt => opt.MapFrom(s => s.Delivery.ExportMyob)
            ).ForMember(
                d => d.IsCancelled,
                opt => opt.MapFrom(s => s.Delivery.IsCancelled)
            ).ForMember(
                d => d.UserAccount,
                opt => opt.MapFrom(s => s.UserAccount)
            ).ForMember(
                d => d.JobDeliveryLines,
                opt => opt.Ignore()
            );
        }
    }
}
