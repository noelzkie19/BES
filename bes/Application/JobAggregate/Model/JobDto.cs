using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using AutoMapper;
using BES.Application.Common.Mappings;
using BES.Application.JobAggregate.Models;
using BES.Domain.Entities;

namespace BES.Application.JobAggregate.Model
{
    public class JobDto : IMapFrom<Job>
    {
        public int Id { get; set; }
        public long JobNumber { get; set; }
        public long? ParentJobNumber { get; set; }
        public string Description { get; set; } = null!;
        public DateTime? StartDate { get; set; }
        public DateTime? DueDate { get; set; }
        public int EstimatedHours { get; set; }
        public int Quantity { get; set; }
        public string DrawingNumber { get; set; } = null!;
        public string RevisionNumber { get; set; } = null!;
        public int ClientId { get; set; }
        public string Client { get; set; } = null!;
        public string OrderNumber { get; set; } = null!;
        public bool Delivered { get; set; }
        // public int QuantityDelivered { get; set; }
        public decimal SalePrice { get; set; }
        public int JobTypeId { get; set; }
        public string JobType { get; set; } = null!;
        public string? Notes { get; set; }
        public int HeatNumber { get; set; }
        public int MaterialMarkup { get; set; }
        public int LabourMarkup { get; set; }
        public string? SetupText { get; set; }
        public bool IsQoutedJob { get; set; }
        public bool IsByHour { get; set; }
        public DateTime? JobCardPrinted { get; set; }
        public string JobId { get; set; }= null!;
        public string NcrNumber { get; set; } = null!;
        public DateTime? DeliveryDate { get; set; }
        public string CompletedBy { get; set;} = null!;
        public string Status { get; set; } = null!;
        public DateTime DateScheduled { get; set; }
        public decimal SalePerUnit { get; set; }
        public decimal SalesPrice { get; set; }
        public decimal DeliveryCharge { get; set; }
        public decimal TotalPrice { get; set; }
        public decimal MaterialCost { get; set; }
        public decimal LabourCost { get; set; }
        public decimal OtherCost { get; set; }
        public decimal TotalCost { get; set; }
        public bool ToBeInvoiced { get; set; }
        public string? InvoiceNumber { get; set; }
        public DateTime JobDatePrinted { get; set; }
        public string QuoteNumberSource { get; set; }
        public int QuantityDelivered { get; set; }
        public decimal MaterialCostVariable { get; private set; }
        public IList<DeliveryLine>? DeliveryLines { get; set; }
        public IList<JobNoteDto> JobNotes { get; set; } = null!;
        public IList<JobSubassemblyDto> SubAssembies { get; set; } = null!;
        public IList<JobDeliveriesDto> JobDeliveries { get; set; } = null!;
        public IList<PurchaseLine> PurchaseOrder { get; set; } = null!;
        public string DueDateFilter { get; set;} 
        public string? QuotePaymentTerm { get; set; }
        public string? QuoteEstLeadTime { get; set; }
        public bool Is30Days { get;  set; }
        public bool IsOverruns { get;  set; }
        public bool IsCod { get;  set; }
        public int QtyAuthorisedOverruns { get;  set; }
        public string CreatedByName { get;  set; }
        public decimal LabourCostRate { get; set; }
        public int Del { get; set; }
        public bool IsDuplicate { get; set;}    
        public int StockQty { get; set;}    
        public int ExpandedItemCnt { get; set;}    
        // public bool IsCompleted {  get {
        //     return QuantityDelivered == Quantity;
        // }}
        public void Mapping(Profile profile)
        {
            profile.CreateMap<JobVm, JobDto>()
            .ForMember(
                d => d.Id,
                opt => opt.MapFrom(s => s.Job.Id)
            ).ForMember(
                d => d.JobId,
                opt => opt.MapFrom(s => s.Job.JobId)
            ).ForMember(
                d => d.ParentJobNumber,
                opt => opt.MapFrom(s => s.Job.ParentJobNumber)
            ).ForMember(
                d => d.Description,
                opt => opt.MapFrom(s => s.Job.Description)
            ).ForMember(
                d => d.DueDate,
                opt => opt.MapFrom(s => s.Job.DueDate)
            ).ForMember(
                d => d.JobType,
                opt => opt.MapFrom(s => s.JobType.Description)
            ).ForMember(
                d => d.Client,
                opt => opt.MapFrom(s => s.Client.Name)
            ).ForMember(
                d => d.Status,
                opt => opt.MapFrom(s => s.Status)
            ).ForMember(
                d => d.DateScheduled,
                 opt => opt.MapFrom(s => (s == null || s.Job == null)
                    ? null : (DateTime?)s.Job.DateScheduled)
            ).ForMember(
                d => d.JobDatePrinted,
                opt => opt.MapFrom(s => s.Job.JobDatePrinted)
            ).ForMember(
                d => d.PurchaseOrder,
                opt => opt.MapFrom(s => s.Job.PurchaseLines)
            ).ForMember(
                 d => d.Quantity,
                opt => opt.MapFrom(s => s.Job.Quantity)
            ).ForMember(
                 d => d.QuantityDelivered,
                opt => opt.MapFrom(s => s.Job.QuantityDelivered)
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
                 d => d.NcrNumber,
                opt => opt.MapFrom(s => s.Job.NcrNumber)
            ).ForMember(
                 d => d.StartDate,
                opt => opt.MapFrom(s => s.Job.StartDate)
            ).ForMember(
                 d => d.JobCardPrinted,
                opt => opt.MapFrom(s => s.Job.JobCardPrinted)
            ).ForMember(
                 d => d.SetupText,
                opt => opt.MapFrom(s => s.Job.SetupText)
            ).ForMember(
                 d => d.DeliveryDate,
                opt => opt.MapFrom(s => s.Job.DeliveryDate)
            ).ForMember(
                 d => d.CompletedBy,
                opt => opt.MapFrom(s => s.Job.CompletedBy)
            ).ForMember(
                 d => d.JobNumber,
                opt => opt.MapFrom(s => s.Job.JobNumber)
            ).ForMember(
                 d => d.IsQoutedJob,
                opt => opt.MapFrom(s => s.Job.IsQoutedJob)
            ).ForMember(
                 d => d.IsByHour,
                opt => opt.MapFrom(s => s.Job.IsByHour)
            ).ForMember(
                 d => d.SalePerUnit,
                opt => opt.MapFrom(s => s.Job.SalePerUnit)
            ).ForMember(
                 d => d.SalesPrice,
                opt => opt.MapFrom(s => s.Job.SalesPrice)
            ).ForMember(
                 d => d.DeliveryCharge,
                opt => opt.MapFrom(s => s.Job.DeliveryCharge)
            ).ForMember(
                 d => d.TotalPrice,
                opt => opt.MapFrom(s => s.Job.TotalPrice)
            ).ForMember(
                 d => d.MaterialCost,
                opt => opt.MapFrom(s => s.Job.MaterialCost)
            ).ForMember(
                 d => d.LabourCost,
                opt => opt.MapFrom(s => s.Job.LabourCost)
            ).ForMember(
                 d => d.OtherCost,
                opt => opt.MapFrom(s => s.Job.OtherCost)
            ).ForMember(
                 d => d.TotalCost,
                opt => opt.MapFrom(s => s.Job.TotalCost)
            ).ForMember(
                 d => d.ToBeInvoiced,
                opt => opt.MapFrom(s => s.Job.ToBeInvoiced)
            ).ForMember(
                 d => d.InvoiceNumber,
                opt => opt.MapFrom(s => s.Job.InvoiceNumber)
            ).ForMember(
                 d => d.MaterialCostVariable,
                opt => opt.MapFrom(s => s.Job.MaterialCostVariable)
            ).ForMember(
                d => d.DueDateFilter,
                 opt => opt.MapFrom(s => (s == null || s.Job == null)
                    ? null : string.Format("{0:MM/d/yyyy}", s.Job.DueDate).ToString())
            ).ForMember(
                d => d.DeliveryLines,
                opt => opt.MapFrom(s => s.Job.DeliveryLines)
            ).ForMember(
                d => d.JobNotes,
                opt => opt.Ignore()
            ).ForMember(
                d => d.QuoteNumberSource,
                opt => opt.MapFrom(s => s.Quote.QuoteNumber)
            )
            // .ForMember(
            //     d => d.QuotePaymentTerm,
            //     opt => opt.MapFrom(s => s.Quote.PaymentTerms)
            // ).ForMember(
            //     d => d.QuoteEstLeadTime,
            //     opt => opt.MapFrom(s => s.Quote.EstLeadTime)
            // ).
            .ForMember(
                d => d.Is30Days,
                opt => opt.MapFrom(s => s.Job.Is30Days)
            ).ForMember(
                d => d.IsOverruns,
                opt => opt.MapFrom(s => s.Job.IsOverruns)
            ).ForMember(
                d => d.IsCod,
                opt => opt.MapFrom(s => s.Job.IsCod)
            ).ForMember(
                d => d.QtyAuthorisedOverruns,
                opt => opt.MapFrom(s => s.Job.QtyAuthorisedOverruns)
            ).ForMember(
                d => d.CreatedByName,
                opt => opt.MapFrom(s => s.CreatedByName)
            ).ForMember(
                d => d.LabourCostRate,
                opt => opt.MapFrom(s => s.Job.LabourCostRate)
            ).ForMember(
                 d => d.Del,
                opt => opt.MapFrom(s => s.Job.Delivered ? 1 : 0)
            ).ForMember(
                 d => d.IsDuplicate,
                opt => opt.MapFrom(s => s.Job.IsDuplicate)
            ).ForMember(
                 d => d.Delivered,
                opt => opt.MapFrom(s => s.Job.Delivered)
            ).ForMember(
                 d => d.Notes,
                opt => opt.MapFrom(s => s.Job.Notes)
            ).ForMember(
                 d => d.StockQty,
                opt => opt.MapFrom(s => s.StockQty)
            ).ForMember(
                 d => d.ExpandedItemCnt,
                opt => opt.MapFrom(s => s.ExpandedItemCnt)
            );  
        }
    }
}