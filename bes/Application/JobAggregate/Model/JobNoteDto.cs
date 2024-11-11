using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using BES.Application.Common.Mappings;
using BES.Domain.Entities;
using AutoMapper;
using BES.Application.JobAggregate.Models;

namespace BES.Application.JobAggregate.Model
{
    public class JobNoteDto : IMapFrom<JobNote>
    {
       public int? Id { get; set; }
       public int JobId { get; set; }
       public string Note { get; set; } = null!;
       public DateTime? Date { get; set; }
       public bool IsDeleted { get; set; }
       public string? CreatedByName { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<JobVm, JobNoteDto>()
            .ForMember(
                d => d.Id,
                 opt => opt.MapFrom(s => (s == null || s.JobNote == null)
                    ? null : (int?)s.JobNote.Id)
            ).ForMember(
                d => d.JobId,
                 opt => opt.MapFrom(s => (s == null || s.JobNote == null)
                    ? null : (int?)s.JobNote.JobId)
            ).ForMember(
                d => d.Note,
                 opt => opt.MapFrom(s => (s == null || s.JobNote == null)
                    ? null : (string?)s.JobNote.Note)
            ).ForMember(
                d => d.Date,
                 opt => opt.MapFrom(s => (s == null || s.JobNote == null)
                    ? null : (DateTime?)s.JobNote.Date)
            ).ForMember(
                d => d.IsDeleted,
                 opt => opt.Ignore()
            ).ForMember(
                d => d.CreatedByName,
                opt => opt.MapFrom(s => s.CreatedByName)
            );
        }
    }
}
