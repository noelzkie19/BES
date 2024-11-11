using BES.Application.SupplierAggregate.Commands.CreateSupplier;
using BES.Application.SupplierAggregate.Commands.DeleteSupplier;
using BES.Application.SupplierAggregate.Commands.UpdateSupplier;
using BES.Application.SupplierAggregate.Queries.GetSupplierAll;
using BES.Application.SupplierAggregate.Queries.GetSupplierById;
using BES.Application.SupplierAggregate.Queries.GetSupplierEmailHistory;
using BES.Application.SupplierAggregate.Queries.GetSupplierPrint;
using BES.Application.SupplierAggregate.Queries.GetSuppliersWithPagination;
using Microsoft.AspNetCore.Mvc;

namespace BES.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SupplierController : ApiControllerBase
    {
        [HttpGet("getsupplierall")]
        public async Task<IActionResult> Get([FromQuery] GetSupplierAll command)
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

        [HttpPost("getsupplierswithpagination")]
        public async Task<IActionResult> Get([FromBody] GetSuppliersWithPagination command)
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

        [HttpPost("getsupplierprint")]
        public async Task<IActionResult> GetSupplierPrint([FromBody] GetSupplierPrint command)
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
        public async Task<IActionResult> Create(CreateSupplier command)
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
        public async Task<IActionResult> Update(UpdateSupplier command)
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
        public async Task<IActionResult> Delete([FromQuery] DeleteSupplier command)
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

        [HttpPost("getsupplieremailhistorywithpagination")]
        public async Task<IActionResult> GetEmailHistoryWithPagination([FromBody] GetSupplierEmailHistory command)
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

        [HttpGet("getsupplierbyid")]
        public async Task<IActionResult> GetSupplierById([FromQuery] GetSupplierById command)
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