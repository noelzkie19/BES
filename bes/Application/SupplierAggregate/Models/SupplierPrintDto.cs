using AutoMapper;
using BES.Application.Common.Mappings;
using BES.Domain.Entities;

namespace BES.Application.SupplierAggregate.Model
{
    public class SupplierPrintDto : IMapFrom<SupplierVm>
    {
        public string SuppierName { get; set; } = null!;
        public bool Approved { get; set; }
        public bool Critical { get; set; }
        public DateTime? LastReview { get; set; }
        public DateTime? NextReview { get; set; }
        public void Mapping(Profile profile)
        {
            profile.CreateMap<SupplierVm, SupplierPrintDto>()
            .ForMember(
                d => d.SuppierName,
                opt => opt.MapFrom(s => s.Supplier.Name)
            ).ForMember(
               d => d.Approved,
                opt => opt.MapFrom(s => (s == null || s.SupplierApproval == null)
                    ? null : (bool?)s.SupplierApproval.InitialApproved)
            ).ForMember(
                d => d.Critical,
                opt => opt.MapFrom(s => (s == null || s.SupplierApproval == null)
                    ? null : (bool?)s.SupplierApproval.InitialCritical)
            ).ForMember(
                d => d.LastReview,
                opt => opt.MapFrom(s => (s == null || s.SupplierApproval == null)
                    ? null : (DateTime?)s.SupplierApproval.LastDate)
            ).ForMember(
                d => d.NextReview,
                opt => opt.MapFrom(s => (s == null || s.SupplierApproval == null)
                    ? null : (DateTime?)s.SupplierApproval.NextDate)
            );
        }
    }
}




