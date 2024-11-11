using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using AutoMapper;
using BES.Application.Common.Mappings;
using BES.Application.JobAggregate.Models;
using BES.Domain.Entities;

namespace BES.Application.JobAggregate.Model
{
    public class JobNcrDto : IMapFrom<Job>
    {
        public int Id { get; set; }
        public long JobNumber { get; set; }
        public string Description { get; set; } = null!;
       
    }
}