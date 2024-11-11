using BES.Application.ClientEmailHistoryAggregate.Queries.GetEmailHistoryWithPagination;
using Microsoft.AspNetCore.Mvc;

namespace BES.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientEmailHistoryController : ApiControllerBase
    {
        [HttpPost("getclientemailhistorywithpagination")]
        public async Task<IActionResult> GetEmailHistoryWithPagination([FromBody] GetEmailHistoryWithPagination command)
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