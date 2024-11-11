
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using AutoMapper;
using BES.Application.Common.Mappings;
using BES.Domain.Entities;

namespace BES.Application.UserAggregate.Models
{
    public class RoleDto 
    {
        public string Id { get; set; }
        public string Name { get; set; } = null!;
        public long DisplayId { get; set;}
    }
}