

using BES.Application.RoleAggregate.Commands.CreateRole;
using BES.Application.RoleAggregate.Commands.DeleteRole;
using BES.Application.RoleAggregate.Commands.UpdateRole;
using BES.Application.RoleAggregate.Queries;
using BES.Domain.Enums;
using BES.WebApi.Common;
using Microsoft.AspNetCore.Mvc;

namespace BES.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ApiControllerBase
    {
        [HttpPost("getroles")]
        public async Task<IActionResult> Get([FromBody] GetRoles command)
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

        [HttpGet("getallroles")]
        public async Task<IActionResult> Get([FromQuery] GetAllRoles command)
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
        public async Task<IActionResult> Create(CreateRole command)
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
        [AuthorizeRoles(UserRoles.Admin)]
        public async Task<IActionResult> Create(UpdateRole command)
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
        // [AuthorizeRoles(UserRoles.Admin)]
        public async Task<IActionResult> Delete([FromQuery] DeleteRole command)
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


        [HttpGet("getrolebyid")]
        public async Task<IActionResult> GetRoleById([FromQuery] GetRoleById command)
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