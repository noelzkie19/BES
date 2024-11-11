using AutoMapper;
using BES.Application.Common.Mappings;
using BES.Domain.Entities;


namespace BES.Application.DeliveryAggregate.Model
{
    public class JobDeliveryDto: IMapFrom<JobDeliveryVm>
    {
        public int Id { get; set; }
        public long JobNumber { get; set; }
        public string JobId { get; set; } = null!;
        public int QtyToSend { get; set; }
        public int ClientId { get; set; }
        public string ClientName { get; set; } = null!;
        public string OrderNumber { get; set; } = null!;
        public string DrawingNumber { get; set; } = null!;
        public string RevisionNumber { get; set; } = null!;
        public string Description { get; set; } = null!;
        public int Quantity { get; set; }
        public bool isSelected { get; set; }

        public int QuantityDelivered
        { 
            get 
            {
                return this.DeliveryLines.Sum(lines => (lines.QuantitySent));
            }
        }

        public DateTime? DueDate { get; set; }
        public List<DeliveryLine> DeliveryLines { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<JobDeliveryVm, JobDeliveryDto>()
            .ForMember(
                d => d.Id,
                opt => opt.MapFrom(s => s.Job.Id)
            ).ForMember(
                d => d.JobNumber,
                opt => opt.MapFrom(s => s.Job.JobNumber)
            ).ForMember(
                d => d.JobId,
                opt => opt.MapFrom(s => s.Job.JobId)
            ).ForMember(
                d => d.ClientId,
                opt => opt.MapFrom(s => (s == null || s.Client == null)
                    ? null : (int?)s.Client.Id)
            ).ForMember(
                d => d.ClientName,
                 opt => opt.MapFrom(s => (s == null || s.Client == null)
                    ? null : (string?)s.Client.Name)
            ).ForMember(
                d => d.OrderNumber,
                opt => opt.MapFrom(s => s.Job.OrderNumber)
            ).ForMember(
                d => d.DrawingNumber,
                opt => opt.MapFrom(s => s.Job.DrawingNumber)
            ).ForMember(
                d => d.RevisionNumber,
                opt => opt.MapFrom(s => s.Job.RevisionNumber)
            ).ForMember(
                d => d.Description,
                opt => opt.MapFrom(s => s.Job.Description)
            ).ForMember(
                d => d.Quantity,
                opt => opt.MapFrom(s => s.Job.Quantity)
            ).ForMember(
                d => d.DueDate,
                opt => opt.MapFrom(s => s.Job.DueDate)
            ).ForMember(
                d => d.DeliveryLines,
                opt => opt.MapFrom(s => s.Job.DeliveryLines)
            ).ForMember(
                d => d.DeliveryLines,
                opt => opt.MapFrom(s => s.Job.DeliveryLines)
            );
        }
    }

    public class JobDeliveryVm
    {
        public Delivery Delivery { get; set; }
        public DeliveryLine DeliveryLine { get; set; }
        public Job Job { get; set; }
        public Client? Client { get; set; }
        public ClientAddress? ClientAddress { get; set; }
        public UserAccount? UserAccount { get; set; }
        public string DueDateString { get; set; }
        public decimal TotalQuantityDelivered { get; set; }
        public string CreatedByName { get; set; }
        
    }
}