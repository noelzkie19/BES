
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using AutoMapper;
using BES.Application.Common.Mappings;
using BES.Domain.Entities;

namespace BES.Application.MachineAggregate.Models
{
    public class MachineDto : IMapFrom<Machine>
    {
        public int? Id { get; set; }
        public string Description { get; set; } = null!;
    }
}