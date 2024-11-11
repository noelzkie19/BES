using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using AutoMapper;
using BES.Application.Common.Mappings;
using BES.Domain.Entities;

namespace BES.Application.StockAggregate.Model
{
    public class StockDto : IMapFrom<Stock>
    {
        public int? Id { get; set; }
        public string? Drawing { get; set; } = null!;
        public string? Revision { get; set; } = null!;
        public int? Quantity { get; set; } = null!;
        public int? JobId { get; set; } = 1!;
        public int? ClientId { get; set; } = 1!;
        public string Notes { get; set; } = null!;
        public string Description { get; set; } = null!;
        public long JobNumber { get; set; } 
        public string ClientName { get; set; }
        public string SJobId { get; set; }

        public void Mapping (Profile profile) {
            profile.CreateMap<StockVm, StockDto>()
            .ForMember(
                d => d.JobId,
                opt => opt.MapFrom(s => s.Job.Id)
            ).ForMember(
                d => d.ClientName,
                opt => opt.MapFrom(s => s.Client.Name)
            ).ForMember(
                d => d.Drawing,
                opt => opt.MapFrom(s => s.Stock.Drawing)
            ).ForMember(
                d => d.Revision,
                opt => opt.MapFrom(s => s.Stock.Revision)
            ).ForMember(
                d => d.Id,
                opt => opt.MapFrom(s => s.Stock.Id)
            ).ForMember(
                d => d.Quantity,
                opt => opt.MapFrom(s => s.Stock.Quantity)
            ).ForMember(
                d => d.Notes,
                opt => opt.MapFrom(s => s.Stock.Notes)
            ).ForMember(
                d => d.Description,
                opt => opt.MapFrom(s => s.Stock.Description)
            ).ForMember(
                d => d.ClientId,
                opt => opt.MapFrom(s => s.Client.Id)
            ).ForMember(
                d => d.JobNumber,
                opt => opt.MapFrom(s => s.Job.JobNumber)
            )
            .ForMember(
                d => d.SJobId,
                opt => opt.MapFrom(s => s.Job.JobId)
            );
        }

    }
    public class StockVm
    {
        public Stock Stock { get; set; }
        public Job Job { get; set; }
        public Client Client { get; set; }
    }
}
