using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using AutoMapper;
using BES.Application.Common.Mappings;
using BES.Domain.Entities;

namespace BES.Application.ClientAggregate.Model
{
    public class ClientDto : IMapFrom<ClientVm>
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
        public string ClientType { get; set; } = null!;
        public string PostalAddress { get; set; } = null!;
        public string PostalSuburb { get; set; } = null!;
        public string PostalState { get; set; } = null!;
        public string PostalPostCode { get; set; } = null!;
        public string ShortName { get; set; } = null!;
        public IList<ClientAddress>? ClientAddresses { get; set; } = null!;
        public IList<ClientContact> ClientContacts { get; set; } = null!;

        public void Mapping(Profile profile)
        {
            profile.CreateMap<ClientVm, ClientDto>()
            .ForMember(
                d => d.Id,
                opt => opt.MapFrom(s => s.Client.Id)
            ).ForMember(
                d => d.Name,
                opt => opt.MapFrom(s => s.Client.Name)
            ).ForMember(
                d => d.Phone,
                opt => opt.MapFrom(s => s.Client.Phone)
            ).ForMember(
                 d => d.Fax,
                opt => opt.MapFrom(s => s.Client.Fax)
            ).ForMember(
                d => d.Email,
                opt => opt.MapFrom(s => s.Client.Email)
            ).ForMember(
                d => d.ContactPerson,
                opt => opt.MapFrom(s => s.Client.ContactPerson)
            ).ForMember(
                d => d.OperatingHrs,
                opt => opt.MapFrom(s => s.Client.OperatingHrs)
            ).ForMember(
                d => d.ClientType,
                opt => opt.MapFrom(s => s.Client.ClientType)
            ).ForMember(
                d => d.Default,
                opt => opt.MapFrom(s => (s == null || s.ClientAddress == null)
                        ? null : (bool?)s.ClientAddress.Default)
            ).ForMember(
                d => d.AddressType,
                opt => opt.MapFrom(s => (s == null || s.ClientAddress == null)
                        ? null : (string?)s.ClientAddress.AddressType)
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
                d => d.ClientAddresses,
                opt => opt.MapFrom(s => s.Client.ClientAddresses)
            ).ForMember(
                d => d.ClientContacts,
                opt => opt.MapFrom(s => s.Client.ClientContacts)
            ).ForMember(
                d => d.PostalAddress,
                opt => opt.MapFrom(s => (s == null || s.ClientAddress == null) 
                    ? null : (string?)s.ClientAddress.PostalAddress)
            ).ForMember(
                d => d.PostalSuburb,
                opt => opt.MapFrom(s => (s == null || s.ClientAddress == null) 
                    ? null : (string?)s.ClientAddress.PostalSuburb)
            ).ForMember(
                d => d.PostalState,
                 opt => opt.MapFrom(s => (s == null || s.ClientAddress == null) 
                    ? null : (string?)s.ClientAddress.PostalState)
            ).ForMember(
                d => d.PostalPostCode,
                 opt => opt.MapFrom(s => (s == null || s.ClientAddress == null) 
                    ? null : (string?)s.ClientAddress.PostalPostCode)
            ).ForMember(
                d => d.ShortName,
                opt => opt.MapFrom(s => s.Client.ShortName)
            );

            
        }

    }

    
}
