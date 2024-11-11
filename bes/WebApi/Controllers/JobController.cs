
using BES.Application.JobAggregate.Commands.CreateJob;
using BES.Application.JobAggregate.Queries.GetJobByClientId;
using Microsoft.AspNetCore.Mvc;
using BES.Application.JobAggregate.Queries.GetJobs;
using BES.Application.JobAggregate.Queries.GetJobTypes;
using BES.Application.JobAggregate.Commands.CreateJobType;
using BES.Application.JobAggregate.Commands.UpdateJob;
using BES.Application.JobAggregate.Commands.DeleteJob;
using BES.Application.JobAggregate.Queries.GetJobPurchaseOrder;
using BES.Application.JobAggregate.Commands.CreateJobSubAssembly;
using BES.Application.JobAggregate.Queries.GetJobAssembliesByJob;
using BES.Application.JobAggregate.Queries.GetJobOperationByJobId;
using BES.Application.JobAggregate.Queries.GetJobById;
using BES.Application.JobAggregate.Queries.GetJobReportPrintDetails;
using BES.Application.JobAggregate.Commands.SendConfirmJobPdf;
using BES.Application.JobAggregate.Queries.GetNcrs;
using BES.Application.JobAggregate.Queries.GetCompleteJobPagination;
using BES.Application.JobAggregate.Queries.GetPendingJobPagination;
using Microsoft.AspNetCore.Authorization;
using BES.Application.JobAggregate.Queries.GetLastJobNumber;
using BES.Application.JobAggregate.Commands.UpdateDuplicatePrint;
using BES.Application.JobAggregate.Queries.GetAllJobs;

namespace BES.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobController : ApiControllerBase
    {
        [HttpPost("getjobswithpagination")]
        public async Task<IActionResult> Get([FromBody] GetJobWithPagination command)
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
        [HttpPost("getcompletejobpagination")]
        public async Task<IActionResult> GetCompleteJobPagination([FromBody] GetCompleteJobPagination command)
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
        [HttpPost("getpendingjobpagination")]
        public async Task<IActionResult> GetPendingJobPagination([FromBody] GetPendingJobPagination command)
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
        public async Task<IActionResult> Create(CreateJob command)
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

        [HttpGet("getjobbyclientid")]
        public async Task<IActionResult> GetJobByClientId([FromQuery] GetJobByClientId command)
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

        [HttpGet("getjobs")]
        public async Task<IActionResult> GetJobs([FromQuery] GetJobs command)
        {
           try
           {
               var data = await Mediator.Send(command);
               return Ok(data);
           }
           catch (Exception ex)
           {
               return BadRequest(ex.Message);
           }
        }


        [HttpGet("getjobbyid")]
        public async Task<IActionResult> GetJobById([FromQuery] GetJobById command)
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
        

       [HttpGet("getjobtypes")]
        public async Task<IActionResult> GetJobTypes([FromQuery] GetJobTypes command)
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

        [HttpGet("getncrs")]
        public async Task<IActionResult> GetNcrs([FromQuery] GetNcrs command)
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
        

        [HttpGet("getjobpurchaseorder")]
        public async Task<IActionResult> GetJobPurchaseOrder([FromQuery] GetJobPurchaseOrder command)
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

        [HttpPost("createjobtype")]
        public async Task<IActionResult> Create(CreateJobType command)
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
        public async Task<IActionResult> Update(UpdateJob command)
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
        public async Task<IActionResult> Delete([FromQuery] DeleteJob command)
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


        [HttpPost("createjobsubassembly")]
        public async Task<IActionResult> CreateJobSubAssembly(CreateJobSubAssembly command)
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


        [HttpGet("getjobassembliesbyjob")]
        public async Task<IActionResult> GetJobAssembliesByJob([FromQuery] GetJobAssembliesByJob command)
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

        [HttpGet("getjoboperationbyjobid")]
        public async Task<IActionResult> GetJobOperationByJobId([FromQuery] GetJobOperationByJobId command)
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

        [HttpPost("getjobreportprint")]
        public async Task<IActionResult> GetJobReportPrintDetails([FromBody] GetJobReportPrintDetails command)
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

        [HttpPost("sendconfirmjobpdf")]
        public async Task<IActionResult> SendConfirmJobPdf([FromForm] SendConfirmJobPdf command)
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

        [HttpGet("getlastjobnumber")]
        public async Task<IActionResult> GetLastJobNumber([FromQuery] GetLastJobNumber command)
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

        [HttpPost("updateduplicateprint")]
        public async Task<IActionResult> UpdateDuplicatePrint(UpdateDuplicatePrint command)
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

        [HttpGet("getalljobs")]
        public async Task<IActionResult> GetAllJobs([FromForm] GetAllJobs command)
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