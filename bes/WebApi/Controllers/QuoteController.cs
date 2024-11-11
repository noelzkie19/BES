using BES.Application.QuoteAggregate.Commands.CreateQuote;
using BES.Application.QuoteAggregate.Commands.UpdateQuote;
using BES.Application.QuoteAggregate.Queries.GetQuoteWithPagination;
using BES.Application.QuoteAggregate.Commands.DeleteQuote;
using Microsoft.AspNetCore.Mvc;
using BES.Application.QuoteAggregate.Commands.ConfirmQuote;
using BES.Application.QuoteAggregate.Commands.PrintQuote;
using BES.Application.QuoteAggregate.Commands.ConvertToJob;
using BES.Application.QuoteAggregate.Queries.GetQuoteById;
using BES.Application.QuoteAggregate.Commands.SendEmailQuotePdf;
using BES.Application.QuoteAggregate.Queries.GetQuoteWithVersion;
using BES.Application.QuoteAggregate.Commands.UpdateQuoteDatePrint;
using BES.Application.QuoteAggregate.Queries.GetQuotesPrint;

namespace BES.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuoteController : ApiControllerBase
    {
        [HttpPost("getquoteswithpagination")]
        public async Task<IActionResult> Get([FromBody] GetQuoteWithPagination command)
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
        public async Task<IActionResult> Create(CreateQuote command)
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
        [HttpPost("confirmquote")]
        public async Task<IActionResult> Confirm(ConfirmQuote command)
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

        [HttpPost("printquote")]
        public async Task<IActionResult> Print(PrintQuote command)
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
        [HttpPost("convertquotetojob")]
        public async Task<IActionResult> ConvertQuoteToJob(ConvertToJob command)
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
        public async Task<IActionResult> Update(UpdateQuote command)
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
        public async Task<IActionResult> Delete([FromQuery] DeleteQuote command)
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
        [HttpGet("getquotebyid")]
        public async Task<IActionResult> GetQuoteById([FromQuery] GetQuoteById command)
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
        [HttpPost("sendemailquotepdf")]
        public async Task<IActionResult> SendPurchasePrint([FromForm] SendEmailQuotePdf command)
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
        [HttpGet("getquotewithversion")]
        public async Task<IActionResult> GetQuoteWithVersion([FromQuery] GetQuoteWithVersion command)
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
        [HttpPatch("updatequotedateprint")]
        public async Task<IActionResult> UpdateQuoteDatePrint([FromBody] UpdateQuoteDatePrint command)
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

        [HttpPost("createquoteversion")]
        public async Task<IActionResult> CreateQuoteVersion([FromBody] CreateQuoteVersion command)
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
        
        [HttpPost("createcopyquote")]
        public async Task<IActionResult> CreateCopyQuote([FromBody] CreateCopyQuote command)
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

        [HttpPost("getquotesprint")]
        public async Task<IActionResult> GetQuotesPrint([FromBody] GetQuotesPrint command)
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