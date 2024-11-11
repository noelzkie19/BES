
using Application.UserAggregate.Commands.ForgotPassword;
using BES.Application.UserAggregate.Commands.CreateUser;
using BES.Application.UserAggregate.Commands.DeleteUser;
using BES.Application.UserAggregate.Commands.UpdateChangePasswordRequired;
using BES.Application.UserAggregate.Commands.UpdateUser;
using BES.Application.UserAggregate.Queries;
using BES.Application.UserAggregate.Queries.GetAdminUsers;
using BES.Application.UserAggregate.Queries.GetUserByEmail;
using BES.Application.UserAggregate.Queries.GetUserById;
using BES.Application.UserAggregate.Queries.GetUsers;
using BES.Domain.Enums;
using BES.WebApi.Common;
using Microsoft.AspNetCore.Mvc;

namespace BES.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ApiControllerBase
    {
        [HttpPost("getuserswithpagination")]
        public async Task<IActionResult> Get([FromBody] GetUsersWithPagination command)
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
        public async Task<IActionResult> Get([FromQuery] GetUsers command)
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
        // [AuthorizeRoles(UserRoles.Admin)]
        public async Task<IActionResult> Create(CreateUser command)
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
        // [AuthorizeRoles(UserRoles.Admin)]
        public async Task<IActionResult> Create(UpdateUser command)
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
        [AuthorizeRoles(UserRoles.Admin)]
        public async Task<IActionResult> Delete([FromQuery] DeleteUser command)
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
        [Route("forgot-password")]
        public async Task<IActionResult> Create(ForgotPassword command)
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
        [Route("update-changepassword-required")]
        public async Task<IActionResult> UpdateChangePasswordRequired(UpdateChangePasswordRequired command)
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
        [Route("getuserbyemail")]
        public async Task<IActionResult> GetUserByEmail([FromQuery] GetUserByEmail command)
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
        [Route("getuserbyid")]
        public async Task<IActionResult> GetUserById([FromQuery] GetUserById command)
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
        [Route("getadminusers")]
        public async Task<IActionResult> GetAdminUsers([FromQuery] GetAdminUsers command)
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