
using BES.Application.Common.Mappings;
using BES.Domain.Entities;
using AutoMapper;

namespace BES.Application.SupplierAggregate.Model
{
    public class SupplierDto : IMapFrom<SupplierVm>
    {
        public int? Id { get; set; }
        public string Name { get; set; } = null!;
        public string Phone { get; set; } = null!;
        public string Fax { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string ContactPerson { get; set; } = null!;
        public string OperatingHrs { get; set; } = null!;

        public bool Default { get; set; }
        public string AddressType { get; set; } = null!;
        public string Street { get; set; } = null!;
        public string Suburb { get; set; } = null!;
        public string State { get; set; } = null!;
        public string PostCode { get; set; } = null!;
        public string PostalAddress { get; set; } = null!;
        public string PostalSuburb { get; set; } = null!;
        public string PostalState { get; set; } = null!;
        public string PostalPostCode { get; set; } = null!;
        public SupplierApproval? SupplierApproval { get; set; }
        public IList<SupplierAddress>? SupplierAddresses { get; set; }
        public IList<SupplierContact>? SupplierContacts { get; set; }
        public IList<SupplierEmailHistoryDto>? SupplierEmailHistories { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<SupplierVm, SupplierDto>()
            .ForMember(
                d => d.Id,
                opt => opt.MapFrom(s => s.Supplier.Id)
            ).ForMember(
                d => d.Name,
                opt => opt.MapFrom(s => s.Supplier.Name)
            ).ForMember(
                d => d.Phone,
                opt => opt.MapFrom(s => s.Supplier.Phone)
            ).ForMember(
                 d => d.Fax,
                opt => opt.MapFrom(s => s.Supplier.Fax)
            ).ForMember(
                d => d.Email,
                opt => opt.MapFrom(s => s.Supplier.Email)
            ).ForMember(
                d => d.ContactPerson,
                opt => opt.MapFrom(s => s.Supplier.ContactPerson)
            ).ForMember(
                d => d.OperatingHrs,
                opt => opt.MapFrom(s => s.Supplier.OperatingHrs)
            ).ForMember(
                d => d.Default,
                opt => opt.MapFrom(s => (s == null || s.SupplierAddress == null) 
                        ? null : (bool?)s.SupplierAddress.Default)
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
                d => d.PostCode,
                 opt => opt.MapFrom(s => (s == null || s.SupplierAddress == null) 
                    ? null : (string?)s.SupplierAddress.PostCode)
            ).ForMember(
                d => d.PostalAddress,
                opt => opt.MapFrom(s => (s == null || s.SupplierAddress == null) 
                    ? null : (string?)s.SupplierAddress.PostalAddress)
            ).ForMember(
                d => d.PostalSuburb,
                opt => opt.MapFrom(s => (s == null || s.SupplierAddress == null) 
                    ? null : (string?)s.SupplierAddress.PostalSuburb)
            ).ForMember(
                d => d.PostalState,
                 opt => opt.MapFrom(s => (s == null || s.SupplierAddress == null) 
                    ? null : (string?)s.SupplierAddress.PostalState)
            ).ForMember(
                d => d.PostalPostCode,
                 opt => opt.MapFrom(s => (s == null || s.SupplierAddress == null) 
                    ? null : (string?)s.SupplierAddress.PostalPostCode)
            ).ForMember(
                d => d.SupplierAddresses,
                opt => opt.MapFrom(s => s.Supplier.SupplierAddresses)
            ).ForMember(
                d => d.SupplierContacts,
                opt => opt.MapFrom(s => s.Supplier.SupplierContacts)
            ).ForMember(
                d => d.SupplierApproval,
                opt => opt.MapFrom(s => s.SupplierApproval)
            )
            .ForMember(
                d => d.SupplierEmailHistories,
                opt => opt.Ignore()
            );
        }
    }

    public class SupplierAllDto : IMapFrom<Supplier>
    {
        public int? Id { get; set; }
        public string Name { get; set; } = null!;
        public string Phone { get; set; } = null!;
        public string Fax { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string ContactPerson { get; set; } = null!;
        public string OperatingHrs { get; set; } = null!;
    }
}
