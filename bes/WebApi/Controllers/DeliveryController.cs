using BES.Application.DeliveryAggregate.Commands.CreateDelivery;
using BES.Application.DeliveryAggregate.Commands.DeleteDelivery;
using BES.Application.DeliveryAggregate.Commands.UpdateDelivery;
using BES.Application.DeliveryAggregate.Commands.UndoDelivery;
using BES.Application.DeliveryAggregate.Queries.GetDeliveryWithPagination;
using BES.Application.DeliveryAggregate.Queries.GetDeliveriesPendingWithPagination;
using BES.Application.DeliveryAggregate.Queries.GetDeliveriesWithPagination;
using BES.Application.DeliveryAggregate.Queries.GetDeliveriesReport;
using BES.Application.DeliveryAggregate.Queries.GetDeliveryById;
using Microsoft.AspNetCore.Mvc;
using BES.Application.DeliveryAggregate.Queries.GetDeliveriesWithPaginationV2;
using BES.Application.DeliveryAggregate.Queries.GetDeliveryLineById;
using BES.Application.DeliveryAggregate.Queries.GetDeliveryLineByNumber;

namespace BES.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeliveryController : ApiControllerBase
    {
        [HttpPost("getdeliverywithpagination")]
        public async Task<IActionResult> Get([FromBody] GetDeliveryWithPagination command)
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

        [HttpPost("getdeliveriespendingwithpagination")]
        public async Task<IActionResult> GetDeliveriesPendingWithPagination([FromBody] GetDeliveriesPendingWithPagination command)
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

        [HttpPost("getdeliverieswithpagination")]
        public async Task<IActionResult> GetDeliveriesWithPagination([FromBody] GetDeliveriesWithPagination command)
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

        
        [HttpPost("getdeliverieswithpaginationv2")]
        public async Task<IActionResult> GetDeliveriesWithPaginationV2([FromBody] GetDeliveriesWithPaginationV2 command)
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

        [HttpPost("getdeliveriesreport")]
        public async Task<IActionResult> GetDeliveriesReport([FromBody] GetDeliveriesReport command)
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
        public async Task<IActionResult> Create([FromBody] CreateDelivery command)
        {
            try
            {
                var result = await Mediator.Send(command);
                
                return Ok(await Mediator.Send(new GetDeliveryById {
                    Id = result
                }));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }



        [HttpPut]
        public async Task<IActionResult> Update(UpdateDelivery command)
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
        public async Task<IActionResult> Delete([FromQuery] DeleteDelivery command)
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

        

        [HttpDelete("undodelivery")]
        public async Task<IActionResult> UndoDelivery([FromQuery]UndoDelivery command)
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

        [HttpGet("getdeliverylinebyid")]
        public async Task<IActionResult> GetDeliveryLineById([FromQuery]GetDeliveryLineById command)
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

        [HttpGet("getdeliverylinebynumber")]
        public async Task<IActionResult> GetDeliveryLineByNumber([FromQuery] GetDeliveryLineByNumber command)
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