
using AutoMapper;
using BES.Application.Common.Mappings;
using BES.Domain.Entities;

namespace BES.Application.PurchaseOrderAggregate.Models
{

    public class JobDto : IMapFrom<Job>
    {
        public int Id { get; set; }
        public long JobNumber { get; set; }
        public string JobId { get; set; }
        public string Description { get; set; }
        public Client Client { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<PurchaseJobVm, JobDto>()
            .ForMember(
                d => d.Id,
                opt => opt.MapFrom(s => s.Job.Id)
            ).ForMember(
                d => d.JobNumber,
                opt => opt.MapFrom(s => s.Job.JobNumber)
            ).ForMember(
                d => d.JobId,
                opt => opt.MapFrom(s => s.Job.JobId)
            ).ForMember(
                d => d.Description,
                opt => opt.MapFrom(s => s.Job.Description)
            ).ForMember(
                d => d.Client,
                opt => opt.MapFrom(s => s.Client)
            );
        }
    }
}
