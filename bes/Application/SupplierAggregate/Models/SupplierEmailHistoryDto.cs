using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using AutoMapper;
using BES.Application.Common.Mappings;
using BES.Domain.Entities;

namespace BES.Application.SupplierAggregate.Model
{
    public class SupplierEmailHistoryDto : IMapFrom<SupplierEmailHistory>
    {
        public int SupplierId { get; set; } 
        public DateTime EmailDate { get; set; }
        public string EmailType { get; set; } = null!;
        public string ReferenceNumber { get; set; } = null!;
        public string EmailedBy { get; set; } = null!;
        public int FileStorageId { get; set; }
        public string FileKey { get; set; } = null!;
        public string SendName { get; set; } 
        public string FilePath { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<SupplierEmailHistoryVm, SupplierEmailHistoryDto>()
             .ForMember(
                d => d.SupplierId,
                opt => opt.MapFrom(s => s.SupplierEmailHistory.SupplierId)
            )
            .ForMember(
                d => d.EmailDate,
                opt => opt.MapFrom(s => s.SupplierEmailHistory.EmailDate)
            )
            .ForMember(
                d => d.EmailType,
                opt => opt.MapFrom(s => s.SupplierEmailHistory.EmailType)
            )
            .ForMember(
                d => d.ReferenceNumber,
                opt => opt.MapFrom(s => s.SupplierEmailHistory.ReferenceNumber)
            )
            .ForMember(
                d => d.EmailedBy,
                opt => opt.MapFrom(s => s.SupplierEmailHistory.EmailedBy)
            )
            .ForMember(
                d => d.SendName,
                opt => opt.MapFrom(s => s.SendName)
            )
            .ForMember(
                d => d.FilePath,
                opt => opt.MapFrom(s => s.FileStorage.FileKey)
            );
        }

    }

      public class SupplierEmailHistoryVm {
        public SupplierEmailHistory SupplierEmailHistory { get; set; }
        public FileStorage FileStorage { get; set; }
        public string SendName { get; set; }
    }
}
