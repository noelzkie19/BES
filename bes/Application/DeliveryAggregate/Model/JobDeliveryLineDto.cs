using AutoMapper;
using BES.Application.Common.Mappings;
using BES.Domain.Entities;

namespace BES.Application.DeliveryAggregate.Model;

public class JobDeliveryLineDto : IMapFrom<JobDeliveryVm>
{
    public int Id { get; set; }
    public long DeliveryLineNumber { get; set; }
    public long DeliveryNumber { get; set; }
    public DateTime DeliveryDate { get; set; }
    public string JobId { get; set; }
    public int QuantitySent { get; set; }
    public int ClientId { get; set; }
    public string ClientName { get; set; } = null!;
    public string OrderNumber { get; set; } = null!;
    public string DrawingNumber { get; set; } = null!;
    public string RevisionNumber { get; set; } = null!;
    public string Description { get; set; } = null!;
    public int Quantity { get; set; }
    public string CreatedBy { get; set; } = null!;
    public DateTime? DueDate { get; set; }
    public string? Street { get; set; }
    public string? Suburb { get; set; }
    public string? State { get; set; }
    public string? PostCode { get; set; }
    public int BalanceQuantity { get; set; }
    public string CreatedByName { get; set; }
    public string Notes { get; set; }

    public void Mapping(Profile profile)
    {
        profile.CreateMap<JobDeliveryVm, JobDeliveryLineDto>()
        .ForMember(
            d => d.Id,
            opt => opt.MapFrom(s => s.DeliveryLine.Id)
        ).ForMember(
            d => d.DeliveryLineNumber,
            opt => opt.MapFrom(s => s.DeliveryLine.DeliveryLineNumber)
        ).ForMember(
            d => d.DeliveryNumber,
            opt => opt.MapFrom(s => s.DeliveryLine.DeliveryNumber)
        ).ForMember(
            d => d.DeliveryDate,
            opt => opt.MapFrom(s => s.Delivery.Date)
        ).ForMember(
            d => d.Notes,
            opt => opt.MapFrom(s => s.Delivery.Notes)
        ).ForMember(
            d => d.JobId,
            opt => opt.MapFrom(s => s.Job.JobId)
        ).ForMember(
            d => d.QuantitySent,
            opt => opt.MapFrom(s => s.DeliveryLine.QuantitySent)
        ).ForMember(
            d => d.BalanceQuantity,
            opt => opt.MapFrom(s => s.DeliveryLine.BalanceQuantity)
        ).ForMember(
            d => d.ClientId,
            opt => opt.MapFrom(s => (s == null || s.Client == null)
                ? null : (int?)s.Client.Id)
        ).ForMember(
            d => d.ClientName,
             opt => opt.MapFrom(s => (s == null || s.Client == null)
                ? null : (string?)s.Client.Name)
        ).ForMember(
            d => d.Street,
             opt => opt.MapFrom(s => (s == null || s.ClientAddress == null)
                ? null : (string?)s.ClientAddress.Street)
        ).ForMember(
            d => d.Suburb,
             opt => opt.MapFrom(s => (s == null || s.ClientAddress == null)
                ? null : (string?)s.ClientAddress.Suburb)
        ).ForMember(
            d => d.State,
             opt => opt.MapFrom(s => (s == null || s.ClientAddress == null)
                ? null : (string?)s.ClientAddress.State)
        ).ForMember(
            d => d.PostCode,
             opt => opt.MapFrom(s => (s == null || s.ClientAddress == null)
                ? null : (string?)s.ClientAddress.PostCode)
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
            d => d.CreatedBy,
            opt => opt.MapFrom(s => s.Job.CreatedBy)
        ).ForMember(
            d => d.CreatedByName,
            opt => opt.MapFrom(s => s.CreatedByName)
        );
    }
}