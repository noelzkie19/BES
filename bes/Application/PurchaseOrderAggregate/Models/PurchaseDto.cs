using AutoMapper;
using BES.Application.Common.Mappings;
using BES.Domain.Entities;

namespace BES.Application.PurchaseOrderAggregate.Models
{
    public class PurchaseDto : IMapFrom<PurchaseVm>
    {
        public int Id { get; set; }
        public string PurchaseNumber { get; set; }
        public int SupplierId { get; set; }
        public DateTime? Date { get; set; }
        public bool Printed { get; set; }
        public DateTime? PrintedDate { get; set; }
        public decimal FreightCost { get; set; }
        public string? Notes { get; set; }
        public bool ExportMyob { get; set; }
        // public string CreatedBy { get; set; } = null!;
        private string _createdBy = null!;
        public string CreatedBy { 
            get
            {
                if (this.FirstName != null || this.LastName != null) {
                    return this.FirstName + " " + this.LastName;
                }
                else {
                    return "";
                }
            } 
            set
            {
                _createdBy = value;
            }
        }
        public string InternalNotes { get; set; } = null!;
        public string InvoiceText { get; set; } = null!;
        public string AddressType { get; set; } = null!;
        public string Street { get; set; } = null!;
        public string Suburb { get; set; } = null!;
        public string State { get; set; } = null!;
        public string PostCode { get; set; } = null!;
        public string SupplierName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public bool IsApproved { get; set; }
        public bool IsCourPlsReceivePays { get; set; }
        public bool IsBesArrCollection { get; set; }
        public bool IsCallReady { get; set; }
        public bool IsCallReadyQuoting { get; set; }
        public bool IsOthers { get; set; }
        public string OtherNotes { get; set; } = null!;
        public string PoNotes { get; set; } = null!;
        public DateTime? DateCreated { get; set; }
        public IList<PurchaseLineDto>? PurchaseLines { get; set; }
        public string ConcatSupplierAddress { get; set; } = null!;
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;

        public void Mapping(Profile profile)
        {
            profile.CreateMap<PurchaseVm, PurchaseDto>()
            .ForMember(
                d => d.Id,
                opt => opt.MapFrom(s => s.Purchase.Id)
            ).ForMember(
                d => d.PurchaseNumber,
                opt => opt.MapFrom(s => s.Purchase.PurchaseNumber)
            ).ForMember(
                d => d.SupplierId,
                opt => opt.MapFrom(s => s.Purchase.SupplierId)
            ).ForMember(
                d => d.Date,
                opt => opt.MapFrom(s => s.Purchase.Date)
            ).ForMember(
                 d => d.Printed,
                opt => opt.MapFrom(s => s.Purchase.Printed)
            ).ForMember(
                 d => d.PrintedDate,
                opt => opt.MapFrom(s => s.Purchase.PrintedDate)
            ).ForMember(
                d => d.FreightCost,
                opt => opt.MapFrom(s => s.Purchase.FreightCost)
            ).ForMember(
                d => d.Notes,
                opt => opt.MapFrom(s => s.Purchase.Notes)
            ).ForMember(
                d => d.ExportMyob,
                opt => opt.MapFrom(s => s.Purchase.ExportMyob)
            ).ForMember(
                d => d.InternalNotes,
                opt => opt.MapFrom(s => s.Purchase.InternalNotes)
            ).ForMember(
                d => d.InvoiceText,
                opt => opt.MapFrom(s => s.Purchase.InvoiceText)
            ).ForMember(
                d => d.IsApproved,
                opt => opt.MapFrom(s => s.Purchase.IsApproved)
            ).ForMember(
                d => d.CreatedBy,
                opt => opt.MapFrom(s => s.Purchase.CreatedBy)
            ).ForMember(
                d => d.IsCourPlsReceivePays,
                opt => opt.MapFrom(s => s.Purchase.IsCourPlsReceivePays)
            ).ForMember(
                d => d.IsBesArrCollection,
                opt => opt.MapFrom(s => s.Purchase.IsBesArrCollection)
            ).ForMember(
                d => d.IsCallReady,
                opt => opt.MapFrom(s => s.Purchase.IsCallReady)
            ).ForMember(
                d => d.IsCallReadyQuoting,
                opt => opt.MapFrom(s => s.Purchase.IsCallReadyQuoting)
            ).ForMember(
                d => d.IsOthers,
                opt => opt.MapFrom(s => s.Purchase.IsOthers)
            ).ForMember(
                d => d.OtherNotes,
                opt => opt.MapFrom(s => s.Purchase.OtherNotes)
            ).ForMember(
                d => d.PoNotes,
                opt => opt.MapFrom(s => s.Purchase.PoNotes)
            ).ForMember(
                d => d.PostCode,
                 opt => opt.MapFrom(s => (s == null || s.SupplierAddress == null)
                    ? null : (string?)s.SupplierAddress.PostCode)
            ).ForMember(
                d => d.AddressType,
                 opt => opt.MapFrom(s => (s == null || s.SupplierAddress == null)
                    ? null : (string?)s.SupplierAddress.AddressType)
            ).ForMember(
                d => d.Street,
                 opt => opt.MapFrom(s => (s == null || s.SupplierAddress == null)
                    ? null : (string?)s.SupplierAddress.Street)
            ).ForMember(
                d => d.Suburb,
                 opt => opt.MapFrom(s => (s == null || s.SupplierAddress == null)
                    ? null : (string?)s.SupplierAddress.Suburb)
            ).ForMember(
                d => d.State,
                 opt => opt.MapFrom(s => (s == null || s.SupplierAddress == null)
                    ? null : (string?)s.SupplierAddress.State)
            ).ForMember(
                d => d.AddressType,
                 opt => opt.MapFrom(s => (s == null || s.SupplierAddress == null)
                    ? null : (string?)s.SupplierAddress.AddressType)
            ).ForMember(
                d => d.SupplierName,
                 opt => opt.MapFrom(s => (s == null || s.Supplier == null)
                    ? null : (string?)s.Supplier.Name)
            ).ForMember(
                d => d.Email,
                 opt => opt.MapFrom(s => (s == null || s.Supplier == null)
                    ? null : (string?)s.Supplier.Email)
            ).ForMember(
                d => d.DateCreated,
                 opt => opt.MapFrom(s => (s == null || s.Purchase == null)
                    ? null : (DateTime?)s.Purchase.Created)
            ).ForMember(
                d => d.PurchaseLines,
                opt => opt.Ignore()
            );
        }
    }
    
}