
using AutoMapper;
using BES.Application.Common.Mappings;
using BES.Domain.Entities;

namespace BES.Application.ScheduleAggregate.Model
{
    public class ScheduleJobDto : IMapFrom<ScheduleJobVm>
    {
        public int Id { get; set; }
        public string JobId { get; set; }
        public string Description { get; set; } = null!;
        public DateTime? DueDate { get; set; }
        public string Client { get; set; }
        public DateTime DateScheduled { get; private set; }
        public int MainJobId { get; set; }
        public string Notes { get; private set; }
        public bool IsUrgent { get; set; }
        public List<Operation> Operations { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<ScheduleJobVm, ScheduleJobDto>()
            .ForMember(
                d => d.Id,
                 opt => opt.MapFrom(s => (s == null || s.Schedule == null)
                    ? null : (int?)s.Schedule.Id)
            ).ForMember(
                d => d.MainJobId,
                opt => opt.MapFrom(s => s.Job.Id)
            ).ForMember(
                d => d.JobId,
                opt => opt.MapFrom(s => s.Job.JobId)
            ).ForMember(
                d => d.Description,
                opt => opt.MapFrom(s => s.Job.Description)
            ).ForMember(
                d => d.DueDate,
                opt => opt.MapFrom(s => s.Job.DueDate)
            ).ForMember(
                d => d.Client,
                opt => opt.MapFrom(s => s.Client.Name)
            ).ForMember(
                d => d.DateScheduled,
                 opt => opt.MapFrom(s => (s == null || s.Job == null)
                    ? null : (DateTime?)s.Job.DateScheduled)
            ).ForMember(
                d => d.Notes,
                 opt => opt.MapFrom(s => (s == null || s.Schedule == null)
                    ? null : (string?)s.Schedule.Notes)
            ).ForMember(
                d => d.IsUrgent,
                 opt => opt.MapFrom(s => (s == null || s.Schedule == null)
                    ? null : (bool?)s.Schedule.IsUrgent)
            ).ForMember(
                d => d.Operations,
                opt => opt.MapFrom(s => s.Job.Operations)
            );
        }
    }

    public class ScheduleJobVm
    {
        public Job Job { get; set; }
        public Client Client { get; set; }
        public Schedule? Schedule { get; set; }
        public string DueDateString { get; set; }
    }
}
