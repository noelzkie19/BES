using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using AutoMapper;
using BES.Application.Common.Mappings;
using BES.Domain.Entities;

namespace BES.Application.ClientEmailHistoryAggregate.Model
{
    public class ClientEmailHistoryDto: IMapFrom<ClientEmailHistory>
    {
        public int ClientId { get; set; } 
        public DateTime EmailDate { get; set; }
        public string EmailType { get; set; }
        public string ReferenceNumber { get; set; }
        public string EmailedBy { get; set; }
        public int FileStorageId { get; set; }
        public string FilePath { get; set; }
        public virtual Client? Client { get; set; }
        public string SendName { get; set; } 

        public void Mapping (Profile profile) {
             profile.CreateMap<ClientEmailHistoryVm, ClientEmailHistoryDto>()
            .ForMember(
                d => d.ClientId,
                opt => opt.MapFrom(s => s.ClientEmailHistory.ClientId)
            )
            .ForMember(
                d => d.EmailDate,
                opt => opt.MapFrom(s => s.ClientEmailHistory.EmailDate)
            )
            .ForMember(
                d => d.EmailType,
                opt => opt.MapFrom(s => s.ClientEmailHistory.EmailType)
            )
            .ForMember(
                d => d.ReferenceNumber,
                opt => opt.MapFrom(s => s.ClientEmailHistory.ReferenceNumber)
            )
            .ForMember(
                d => d.EmailedBy,
                opt => opt.MapFrom(s => s.ClientEmailHistory.EmailedBy)
            )
            .ForMember(
                d => d.FilePath,
                opt => opt.MapFrom(s => s.FileStorage.FileKey)
            )
            .ForMember(
                d => d.SendName,
                opt => opt.MapFrom(s => s.SendName)
            );
        }
    }

    public class ClientEmailHistoryVm {
        public ClientEmailHistory ClientEmailHistory { get; set; }
        public FileStorage FileStorage { get; set; }
        public string SendName { get; set; }
    }
}