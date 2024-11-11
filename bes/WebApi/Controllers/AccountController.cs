using BES.Application.AccountAggregate.Commands.CreateAccount;
using BES.Application.AccountAggregate.Queries.GetAccountWithPagination;
using Microsoft.AspNetCore.Mvc;

namespace BES.WebApi.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ApiControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] GetAccountWithPagination command)
        {
            return Ok(await Mediator.Send(command));
        }
        
        [HttpPost]
        public async Task<IActionResult> Create(CreateAccount command)
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