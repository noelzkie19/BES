using System;
using System.Collections.Generic;
using AutoMapper;
using BES.Application.Common.Mappings;
using BES.Domain.Entities;

namespace BES.Application.PurchaseOrderAggregate.Models
{
    public class PurchaseLineDto : IMapFrom<PurchaseLine>
    {
        public int Id { get; set; }
        public long PurchaseLineNumber { get; set; }
        public string PurchaseNumber { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public int QuantityReceived { get; set; }
        public bool Received { get; set; }
        public string Description { get; set; } = null!;
        public DateTime? DueDate { get; set; }
        public decimal CostEach { get; set; }
        public decimal CostEachTotal { get {
            return CostEach * Quantity;
        } }
        public decimal CostTotal { get; set; }
        public int? JobId { get; set; }
        public string AccountNumber { get; set; } = null!;
        public bool IsIncludeGST { get; set; }
        public bool IsMaterialCertRequired { get; set; }
        public string InvoiceNumber { get; set; }
        public bool IsDeleted { get; set; }
        // public string? DisplayJobId 
        // { 
        //     get 
        //     {
        //         return Job == null ? "0" : Job.JobId;
        //     }
        // }
        public IList<PurchaseReceiptDto> PurchaseReceipts { get; set; }
        public string? ClientName { get; set; } = null!;
        public string? DisplayJobId { get; set; } = null!;
        public string? JobDescription { get; set; } = null!;
        public bool IsCompleted { get; set;}
        public int QuantityDelivered { get; set;}
        public bool Internal { get; set; }
        public decimal GstAmount { get; set; }
        public string? SupplierName { get; set; } = null!;
        public DateTime? PurchaseDate { get; set; }
        public DateTime? PrintedDate { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<PurchaseVm, PurchaseLineDto>()
            .ForMember(
                d => d.Id,
                opt => opt.MapFrom(s => s.PurchaseLine.Id)
            )
            .ForMember(
                d => d.PurchaseLineNumber,
                opt => opt.MapFrom(s => s.PurchaseLine.PurchaseLineNumber)
            )
            .ForMember(
                d => d.PurchaseNumber,
                opt => opt.MapFrom(s => s.PurchaseLine.PurchaseNumber)
            )
            .ForMember(
                d => d.Quantity,
                opt => opt.MapFrom(s => s.PurchaseLine.Quantity)
            )
            .ForMember(
                d => d.QuantityReceived,
                opt => opt.MapFrom(s => s.PurchaseLine.QuantityReceived)
            )
            .ForMember(
                d => d.Received,
                opt => opt.MapFrom(s => s.PurchaseLine.Received)
            )
            .ForMember(
                d => d.Description,
                opt => opt.MapFrom(s => s.PurchaseLine.Description)
            )
            .ForMember(
                d => d.DueDate,
                opt => opt.MapFrom(s => s.PurchaseLine.DueDate)
            )
            .ForMember(
                d => d.CostEach,
                opt => opt.MapFrom(s => s.PurchaseLine.CostEach)
            )
            .ForMember(
                d => d.CostTotal,
                opt => opt.MapFrom(s => s.PurchaseLine.CostTotal)
            )
            .ForMember(
                d => d.JobId,
                opt => opt.MapFrom(s => s.PurchaseLine.JobId)
            )
            .ForMember(
                d => d.AccountNumber,
                opt => opt.MapFrom(s => s.PurchaseLine.AccountNumber)
            )
            .ForMember(
                d => d.IsIncludeGST,
                opt => opt.MapFrom(s => s.PurchaseLine.IsIncludeGST)
            )
            .ForMember(
                d => d.IsMaterialCertRequired,
                opt => opt.MapFrom(s => s.PurchaseLine.IsMaterialCertRequired)
            )
            .ForMember(
                d => d.InvoiceNumber,
                opt => opt.MapFrom(s => s.PurchaseLine.InvoiceNumber)
            )
            .ForMember(
                d => d.IsDeleted,
                opt => opt.MapFrom(s => s.IsDeleted)
            ).ForMember(
                d => d.ClientName,
                opt => opt.MapFrom(s => s.ClientName)
            ).ForMember(
                d => d.DisplayJobId,
                opt => opt.MapFrom(s => s.DisplayJobId)
            ).ForMember(
                d => d.JobDescription,
                opt => opt.MapFrom(s => s.JobDescription)
            ).ForMember(
                d => d.PurchaseReceipts,
                opt => opt.MapFrom(s => s.PurchaseLine.PurchaseReceipts.Where(x => !x.Deleted.HasValue))
            ).ForMember(
                d => d.SupplierName,
                    opt => opt.MapFrom(s => (s == null || s.Supplier == null)
                    ? null : (string?)s.Supplier.Name)
            ).ForMember(
                d => d.PurchaseDate,
                    opt => opt.MapFrom(s => (s == null || s.Supplier == null)
                    ? null : (DateTime?)s.Purchase.Date)
            ).ForMember(
                d => d.PrintedDate,
                    opt => opt.MapFrom(s => (s == null || s.Supplier == null)
                    ? null : (DateTime?)s.Purchase.PrintedDate)
            ).ForMember(
                d => d.QuantityDelivered,
                opt => opt.MapFrom(s => s.QuantityDelivered)
            ).ForMember(
                d => d.GstAmount,
                opt => opt.MapFrom(s => s.PurchaseLine.GstAmount)
            ).ForMember(
                d => d.Internal,
                opt => opt.MapFrom(s => s.PurchaseLine.Internal)
            );
        }

    }
}