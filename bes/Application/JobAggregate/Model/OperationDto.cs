using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using BES.Application.Common.Mappings;
using BES.Domain.Entities;
using AutoMapper;

namespace BES.Application.JobAggregate.Model
{
    public class OperationDto : IMapFrom<Operation>
    {
        public int? Id { get; set; }
        public int Number { get; set; }
        public int JobId { get; set; }
        public string Description { get; set; } = null!;
        public DateTime? DateCompleted { get; set; }
        public int Hours { get; set; }
        public int Quantity { get; set; }
        public int Priority { get; set; }
        public string Notes { get; set; } = string.Empty;
        public bool ProgDone { get; set; }
        public int QuoteId { get; set; }
        public decimal? ExpectedProcessTime { get; set; }
        public decimal Prog { get; set; }
        public decimal Set { get; set; }
        public decimal Run { get; set; }
        public decimal Other { get; set; }
        public int? OperatorId { get; set; }
        public bool IsDeleted { get; set; }
        public string? Resource { get; set; }
        public int? ResourceId { get; set; }
        // public int FirstFocHr { get; set; }
        // public int FirstFocOperatorId { get; set; }
        // public int SecondFocHr { get; set; }
        // public int SecondFocOperatorId { get; set; }
        // public int ThirdFocHr { get; set; }
        // public int ThirdFocOperatorId { get; set; }
        // public int FourthFocHr { get; set; }
        // public int FourthFocOperatorId { get; set; }
        // public int FirstPcHr { get; set; }
        // public int FirstPcOperatorId { get; set; }
        // public int SecondPcHr { get; set; }
        // public int SecondPcOperatorId { get; set; }
        // public int ThirdPcHr { get; set; }
        // public int ThirdPcOperatorId { get; set; }
        // public int FourthPcHr { get; set; }
        // public int FourthPcOperatorId { get; set; }
        public decimal HourlyRate { get; set; }
        public bool ProInsFirst1 { get; set; }
        public bool ProInsFirst2 { get; set; }
        public bool ProInsFirst3 { get; set; }
        public bool ProInsINS { get; set; }
        // public List<OperationResourceDto>? OperationResources { get; set; }
        // public List<OperationOperatorDto>? OperationOperators { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Operation, OperationDto>();
            // .ForMember(
            //     d => d.OperationResources,
            //     opt => opt.Ignore()
            // ) .ForMember(
            //     d => d.OperationOperators,
            //     opt => opt.Ignore()
            // );
        }
    }
}
