
using BES.Application.ScheduleAggregate.Commands.AllocateSchedule;
using BES.Application.ScheduleAggregate.Queries.GetScheduleUnallocatedJob;
using BES.Application.ScheduleAggregate.Queries.GetScheduleAllocatedJob;
using Microsoft.AspNetCore.Mvc;
using BES.Application.ScheduleAggregate.Commands.UnallocateSchedule;
using BES.Application.ScheduleAggregate.Commands.UpdateJobSchedule;
using BES.Application.ScheduleAggregate.Commands.UpdateScheduleNotes;
using BES.Application.ScheduleAggregate.Queries.GetScheduleStaff;
using Microsoft.AspNetCore.Authorization;

namespace BES.WebApi.Controllers
{
    [Route("api/[controller]")]
    [Controller]
    [AllowAnonymous]
    public class ScheduleController : ApiControllerBase
    {
        [HttpPost("getscheduleunallocatedjob")]
        public async Task<IActionResult> GetscheduleUnallocatedJob([FromBody] GetScheduleUnallocatedJob command)
        {
            try
            {
                return Ok(await Mediator.Send(command));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("getscheduleallocatedjob")]
        public async Task<IActionResult> GetScheduleAllocatedJob([FromBody] GetScheduleAllocatedJob command)
        {
            try
            {
                return Ok(await Mediator.Send(command));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("getschedulestaff")]
        public async Task<IActionResult> GetScheduleStaff([FromBody] GetScheduleStaff command)
        {
            try
            {
                return Ok(await Mediator.Send(command));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("allocateschedule")]
        public async Task<IActionResult> AllocateSchedule([FromBody] AllocateSchedule command)
        {
            try
            {
                return Ok(await Mediator.Send(command));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("unallocateschedule")]
        public async Task<IActionResult> UnallocateSchedule([FromBody] UnallocateSchedule command)
        {
            try
            {
                return Ok(await Mediator.Send(command));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPatch("updatejobschedule")]
        public async Task<IActionResult> UpdateJobSchedule([FromBody] UpdateJobSchedule command)
        {
            try
            {
                return Ok(await Mediator.Send(command));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPatch("updateschedulenotes")]
        public async Task<IActionResult> UpdateScheduleNotes([FromBody] UpdateScheduleNotes command)
        {
            try
            {
                return Ok(await Mediator.Send(command));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        
    }
}