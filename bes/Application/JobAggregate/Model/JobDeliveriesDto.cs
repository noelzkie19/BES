using AutoMapper;
using BES.Application.Common.Mappings;
using BES.Application.JobAggregate.Models;
using BES.Domain.Entities;

namespace BES.Application.JobAggregate.Model
{
    public class JobDeliveriesDto : IMapFrom<DeliveryLine>
    {
        public int Id { get; set; }
        public string JobId { get; set; }= null!;
        public string DeliveryNumber { get; set; } = null!;
        public DateTime DeliveryDate { get; set; }
        public int QuantitySent { get; set; }
        public string CreatedBy { 
            get {
                return UserAccount != null ? UserAccount.FirstName + " " + UserAccount.LastName : "Administrator";
            }  
        }
        public UserAccount UserAccount { get; set; }

        

        public void Mapping(Profile profile)
        {
            profile.CreateMap<JobVm, JobDeliveriesDto>()
            .ForMember(
                d => d.Id,
                opt => opt.MapFrom(s => s.DeliveryLine.Id)
            ).ForMember(
                d => d.JobId,
                opt => opt.MapFrom(s => s.DeliveryLine.JobId)
            ).ForMember(
                d => d.DeliveryNumber,
                opt => opt.MapFrom(s => s.DeliveryLine.DeliveryNumber)
            ).ForMember(
                d => d.QuantitySent,
                opt => opt.MapFrom(s => s.DeliveryLine.QuantitySent)
            ).ForMember(
                d => d.DeliveryDate,
                opt => opt.MapFrom(s => s.Delivery.Date)
            ).ForMember(
                d => d.UserAccount,
                opt => opt.MapFrom(s => s.UserAccount)
            );
        }
    }
}