
using AutoMapper;
using BES.Application.Common.Mappings;
using BES.Application.JobAggregate.Models;
using BES.Domain.Entities;

namespace BES.Application.JobAggregate.Model
{
    public class JobPurchaseOrderDto : IMapFrom<JobVm>
    {
        public int? Id { get; set; }
        public long JobId { get; set; }
        public string PurchaseNumber { get; set; }
        public int PurchaseLineNumber { get; set; }
        public string? Supplier { get; set; } = null!;
        public string? HeatNumber { get; set; } = null!;
        public string Description { get; set; } = null!;
        public DateTime PurchaseDate { get; set; }
        public DateTime? DueDate { get; set; }
        public int Quantity { get; set; }
        public decimal CostEach { get; set; }
        public decimal CostTotal { get; set; }
        public string CreatedBy { 
            get {
                return UserAccount != null ? UserAccount.FirstName + " " + UserAccount.LastName : "Administrator";
            }  
        }
        public int Received
        {
            get
            {
                return this.PurchaseReceipts.Sum(lines => (lines.Quantity));
            }
        }
        public bool IsReceived
        {
            get
            {
                return this.PurchaseReceipts.Count() > 0;
            }
        }

        
        public UserAccount? UserAccount { get; set; }
        public IList<PurchaseReceipt> PurchaseReceipts { get; set; }
        
        public void Mapping(Profile profile)
        {
            profile.CreateMap<JobVm, JobPurchaseOrderDto>()
             .ForMember(
                d => d.Id,
                 opt => opt.MapFrom(s => (s == null || s.PurchaseLine == null)
                    ? null : (int?)s.PurchaseLine.Id)
             )
            .ForMember(
                d => d.JobId,
                 opt => opt.MapFrom(s => (s == null || s.PurchaseLine == null)
                    ? null : (int?)s.PurchaseLine.JobId)
            ).ForMember(
                d => d.PurchaseNumber,
                 opt => opt.MapFrom(s => (s == null || s.PurchaseLine == null)
                    ? null : (string?)s.PurchaseLine.PurchaseNumber)
            ).ForMember(
                d => d.PurchaseLineNumber,
                 opt => opt.MapFrom(s => (s == null || s.PurchaseLine == null)
                    ? null : (int?)s.PurchaseLine.PurchaseLineNumber)
            ).ForMember(
                d => d.Description,
                  opt => opt.MapFrom(s => (s == null || s.PurchaseLine == null)
                    ? null : (string?)s.PurchaseLine.Description)
            ).ForMember(
                d => d.Supplier,
                 opt => opt.MapFrom(s => (s == null || s.Supplier == null)
                    ? null : (string?)s.Supplier.Name)
            ).ForMember(
                d => d.PurchaseDate,
                 opt => opt.MapFrom(s => (s == null || s.Purchase == null)
                    ? null : (DateTime?)s.Purchase.Date)
            ).ForMember(
                d => d.DueDate,
                 opt => opt.MapFrom(s => (s == null || s.PurchaseLine == null)
                    ? null : (DateTime?)s.PurchaseLine.DueDate)
            ).ForMember(
                d => d.Quantity,
                 opt => opt.MapFrom(s => (s == null || s.PurchaseLine == null)
                    ? null : (int?)s.PurchaseLine.Quantity)
            ).ForMember(
                d => d.CostEach,
                opt => opt.MapFrom(s => (s == null || s.PurchaseLine == null)
                    ? null : (decimal?)s.PurchaseLine.CostEach)
            ).ForMember(
                d => d.CostTotal,
                opt => opt.MapFrom(s => (s == null || s.PurchaseLine == null)
                    ? null : (decimal?)s.PurchaseLine.CostTotal)
            ).ForMember(
                d => d.UserAccount,
                opt => opt.MapFrom(s => s.UserAccount)
            ).ForMember(
                d => d.PurchaseReceipts,
                opt => opt.MapFrom(s => s.PurchaseLine.PurchaseReceipts)
            );
        }
    }
}
