using BES.Application.PurchaseOrderAggregate.Queries.PurchaseOrderWithPagination;
using BES.Application.PurchaseOrderAggregate.Commands.CreatePurchaseOrder;
using BES.Application.PurchaseOrderAggregate.Commands.UpdatePurchaseOrder;
using BES.Application.PurchaseOrderAggregate.Commands.UpdatePurchaseOrderPrintDate;
using BES.Application.PurchaseOrderAggregate.Commands.DeletePurchaseOrder;
using BES.Application.PurchaseOrderAggregate.Queries.GetAvailableJob;

using Microsoft.AspNetCore.Mvc;
using Application.Common.Models.Email;
using BES.Application.Common.Interfaces;
using Application.Common.Interfaces;
using BES.Application.PurchaseOrderAggregate.Commands.SendPurchaseOrderPdf;
using BES.Application.PurchaseOrderAggregate.Queries.GetAvailablePo;
using BES.Application.PurchaseOrderAggregate.Queries.PurchaseOrderWithPaginationV2;
using BES.Application.PurchaseOrderAggregate.Queries.GetPurchaseById;

namespace BES.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PurchaseOrderController : ApiControllerBase
    {
        ICurrentUserService _currentUser;
        IMailClientService _emailService;

        public PurchaseOrderController(ICurrentUserService currentUser,
           IMailClientService emailService)
        {
            _currentUser = currentUser;
            _emailService = emailService;

        }


        [HttpPost("purchaseorderwithpagination")]
        public async Task<IActionResult> Get(PurchaseOrderWithPagination command)
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

        [HttpPost("purchaseorderwithpaginationv2")]
        public async Task<IActionResult> PurchaseOrderWithPaginationV2(PurchaseOrderWithPaginationV2 command)
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
        public async Task<IActionResult> Create([FromBody] CreatePurchaseOrder command)
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
        public async Task<IActionResult> Update([FromBody] UpdatePurchaseOrder command)
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
        public async Task<IActionResult> Update([FromQuery] DeletePurchaseOrder command)
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

        [HttpPost("updateprintdate")]
        public async Task<IActionResult> UpdatePrintDate([FromBody] UpdatePurchaseOrderPrintDate command)
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


        

        [HttpPost("sendpurchaseprint")]
        public async Task<IActionResult> SendPurchasePrint([FromForm] SendPurchaseOrderPdf command)
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


        [HttpGet("getavailablejob")]
        public async Task<IActionResult> GetAvailableJob([FromForm] GetAvailableJob command)
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


        [HttpGet("getavailablepo")]
        public async Task<IActionResult> GetAvailablePo([FromForm] GetAvailablePo command)
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

        [HttpGet("getpurchasebyid")]
        public async Task<IActionResult> GetPurchaseById([FromQuery] GetPurchaseById command)
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

        [HttpGet("getlastponumber")]
        public async Task<IActionResult> GetLastPoNumber([FromQuery] GetLastPoNumber command)
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