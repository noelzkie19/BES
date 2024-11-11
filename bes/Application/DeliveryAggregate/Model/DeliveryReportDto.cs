using AutoMapper;
using BES.Application.Common.Mappings;
using BES.Domain.Entities;


namespace BES.Application.DeliveryAggregate.Model
{
    public class DeliveryReportDto : IMapFrom<JobDeliveryVm>
    {
        public int Id { get; set; }
        public string JobId { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string ClientName { get; set; } = null!;
        public int Quantity { get; set; }
        public DateTime Date { get; set; }
        public string DeliveryNumber { get; set; } = null!;
        public void Mapping(Profile profile)
        {
            profile.CreateMap<JobDeliveryVm, DeliveryReportDto>()
            .ForMember(
                d => d.Id,
                opt => opt.MapFrom(s => s.Delivery.Id)
            ).ForMember(
                d => d.Description,
                opt => opt.MapFrom(s => s.Job.Description)
            ).ForMember(
                d => d.JobId,
                opt => opt.MapFrom(s => s.Job.JobId)
            ).ForMember(
                d => d.ClientName,
                 opt => opt.MapFrom(s => (s == null || s.Client == null)
                    ? null : (string?)s.Client.Name)
            ).ForMember(
                d => d.Quantity,
                opt => opt.MapFrom(s => s.DeliveryLine.QuantitySent)
            ).ForMember(
                d => d.Date,
                opt => opt.MapFrom(s => s.Delivery.Date)
            ).ForMember(
                d => d.DeliveryNumber,
                opt => opt.MapFrom(s => s.Delivery.DeliveryNumber)
            );

            
        }
    }
}