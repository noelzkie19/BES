using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BES.Application.ResourceAggregate.Commands.CreateResource;
using BES.Application.ResourceAggregate.Commands.DeleteResource;
using BES.Application.ResourceAggregate.Commands.UpdateResouce;
using BES.Application.ResourceAggregate.Queries.GetResourcesWithPagination;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using BES.Application.ResourceAggregate.Queries.GetResources;
using BES.Application.ResourceAggregate.Queries.GetResourceById;

namespace BES.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResourceController : ApiControllerBase
    {
        [HttpPost("getresourceswithpagination")]
        public async Task<IActionResult> GetResourcesWithPagination([FromBody] GetResourcesWithPagination command)
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
        public async Task<IActionResult> Create(CreateResource command)
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
        public async Task<ActionResult> Update(UpdateResource command)
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
        public async Task<IActionResult> Delete([FromQuery] DeleteResource command)
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
        
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] GetResources command)
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
        [HttpGet("getresourcebyid")]
        public async Task<IActionResult> GetResourceById([FromQuery] GetResourceById command)
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