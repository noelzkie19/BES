using BES.Application.ClientAggregate.Commands.CreateClient;
using BES.Application.ClientAggregate.Commands.DeleteClient;
using BES.Application.ClientAggregate.Commands.UpdateClient;
using BES.Application.ClientAggregate.Queries.GetClientAll;
using BES.Application.ClientAggregate.Queries.GetClientById;
using BES.Application.ClientAggregate.Queries.GetClientList;
using BES.Application.ClientAggregate.Queries.GetClientsWithDelivery;
using BES.Application.ClientAggregate.Queries.GetClientWithPagination;
using Microsoft.AspNetCore.Mvc;

namespace BES.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ApiControllerBase
    {
        [HttpPost("getclientswithpagination")]
        public async Task<IActionResult> Get([FromBody] GetClientWithPagination command)
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

        [HttpGet("getclientall")]
        public async Task<IActionResult> GetClientAll([FromQuery] GetClientAll command)
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
        public async Task<IActionResult> Create(CreateClient command)
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

        [HttpPut]
        public async Task<IActionResult> Update(UpdateClient command)
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

        [HttpDelete]
        public async Task<IActionResult> Delete([FromQuery] DeleteClient command)
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

        [HttpGet("getclientswithdelivery")]
        public async Task<IActionResult> Get([FromQuery] GetClientsWithDelivery command)
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
        [HttpGet("getclientlist")]
        public async Task<IActionResult> GetClientLest([FromQuery] GetClientList command)
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

        [HttpGet("getclientbyid")]
        public async Task<IActionResult> GetClientById([FromQuery] GetClientById command)
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