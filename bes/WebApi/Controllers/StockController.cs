using BES.Application.StockAggregate.Commands.CreateStock;
using BES.Application.StockAggregate.Queries.GetStockWithPagination;
using BES.Application.StockAggregate.Commands.UpdateStock;
using BES.Application.StockAggregate.Commands.DeleteStock;
using Microsoft.AspNetCore.Mvc;
using BES.Application.StockAggregate.Queries.GetStockPrint;
using BES.Application.StockAggregate.Queries.GetStockById;
using BES.Application.StockAggregate.Queries.GetStockByDrawingRev;

namespace BES.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StockController : ApiControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Create(CreateStock command)
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
        [HttpPost("getstockswithpagination")]
        public async Task<IActionResult> Get([FromBody] GetStockWithPagination command)
        {
            try
            {
                OkObjectResult result = Ok(await Mediator.Send(command));
                return result;
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut]
        public async Task<IActionResult> Update(UpdateStock command)
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
        public async Task<IActionResult> Delete([FromQuery] DeleteStock command)
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

        [HttpPost("getstockprint")]
        public async Task<IActionResult> GetStockPrint([FromBody] GetStockPrint command)
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

        [HttpGet("getstockbyid")]
        public async Task<IActionResult> GetStockById([FromQuery] GetStockById command)
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
        
        [HttpGet("getstockbydrawingrev")]
        public async Task<IActionResult> GetStockByDrawingRev([FromQuery] GetStockByDrawingRev command)
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