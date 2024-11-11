
using Microsoft.AspNetCore.Mvc;
using BES.Application.MachineAggregate.Commands.CreateMachine;
using BES.Application.MachineAggregate.Queries.GetMachines;

namespace BES.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MachineController : ApiControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] GetMachines command)
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

        [HttpPost]
        public async Task<IActionResult> Create([FromQuery] CreateMachine command)
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