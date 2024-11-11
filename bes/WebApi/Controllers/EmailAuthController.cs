using BES.Application.EmailAuthAggregate.Commands.CreateEmailAuth;
using BES.Application.EmailAuthAggregate.Commands.ValidateExistsEmailAuth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BES.WebApi.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class EmailAuthController : ApiControllerBase
    {
        [HttpGet("validateexistsemailauth")]
        public async Task<IActionResult> Get([FromQuery] ValidateExistsEmailAuth command)
        {
            return Ok(await Mediator.Send(command));
        }
        
        [HttpPost("createemailauth")]
        public async Task<IActionResult> CreateEmailAuth([FromBody] CreateEmailAuth command)
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