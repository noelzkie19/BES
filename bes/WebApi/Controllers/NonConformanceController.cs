using BES.Application.NonConformanceAggregate.Commands.CreateNonConformance;
using BES.Application.NonConformanceAggregate.Commands.DeleteNonConformance;
using BES.Application.NonConformanceAggregate.Commands.UpdateNonConformance;
using BES.Application.NonConformanceAggregate.Queries.GetNonConformanceAll;
using BES.Application.NonConformanceAggregate.Queries.GetNonConformanceById;
using BES.Application.NonConformanceAggregate.Queries.GetNonConformancePrint;
using BES.Application.NonConformanceAggregate.Queries.GetNonConformanceWithPagination;
using BES.Application.NonConformanceAggregate.Queries.GetNewNCRnumber;
using Microsoft.AspNetCore.Mvc;

namespace BES.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NonConformanceController : ApiControllerBase
    {
        [HttpPost("getnonconformancewithpagination")]
        public async Task<IActionResult> Get([FromBody] GetNonConformanceWithPagination command)
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
        public async Task<IActionResult> Create(CreateNonConformance command)
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

        [HttpGet("getnonconformancebyid")]
        public async Task<IActionResult> GetJobById([FromQuery] GetNonConformanceById command)
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
        public async Task<IActionResult> Update(UpdateNonConformance command)
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
        public async Task<IActionResult> Delete([FromQuery] DeleteNonConformance command)
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

        [HttpGet("getnonconformanceall")]
        public async Task<IActionResult> Get([FromQuery] GetNonConformanceAll command)
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

        [HttpPost("getnonconformanceprint")]
        public async Task<IActionResult> GetNonConformancePrint([FromBody] GetNonConformancePrint command)
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

        [HttpGet("getnewncrnumber")]
        public async Task<IActionResult> GetLastPoNumber([FromQuery] GetNewNCRnumber command)
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