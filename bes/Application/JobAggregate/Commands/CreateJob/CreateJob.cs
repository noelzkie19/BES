using MediatR;
using BES.Application.Common.Interfaces;
using BES.Domain.Entities;
using BES.Application.JobAggregate.Model;
using BES.Application.JobAggregate.events;
using BES.Domain.Events;
using BES.Application.Common.Exceptions;

namespace BES.Application.JobAggregate.Commands.CreateJob;
public class CreateJob : IRequest<int>
{
    public long JobNumber { get; set; }
    public string Description { get; set; } = null!;
    public DateTime? StartDate { get; set; }
    public DateTime? DueDate { get; set; }
    public int EstimatedHours { get; set; }
    public int Quantity { get; set; }
    public string DrawingNumber { get; set; } = null!;
    public string RevisionNumber { get; set; } = null!;
    public int ClientId { get; set; }
    public string OrderNumber { get; set; } = null!;
    public bool Delivered { get; set; }
    public int QuantityDelivered { get; set; }
    public decimal SalePrice { get; set; }
    public int JobTypeId { get; set; }
    public string Notes { get; set; } = string.Empty;
    public int HeatNumber { get; set; }
    public int MaterialMarkup { get; set; }
    public int LabourMarkup { get; set; }
    public string SetupText { get; set; } = string.Empty;
    public string NcrNumber { get; set; } = string.Empty;
    public string CompletedBy { get; set; } = string.Empty;
    public bool IsQoutedJob { get; set; }
    public bool IsByHour { get; set; }
    public decimal SalePerUnit { get; set; }
    public decimal SalesPrice { get; set; }
    public decimal DeliveryCharge { get; set; }
    public decimal TotalPrice { get; set; }
    public decimal MaterialCost { get; set; }
    public decimal LabourCost { get; set; }
    public decimal OtherCost { get; set; }
    public decimal TotalCost { get; set; }
    public bool ToBeInvoiced { get; set; }
    public string? InvoiceNumber { get; set; }
    public int? JobIdSource { get; set; }
    public bool Copy { get; set; }
    public decimal MaterialCostVariable { get; set; }
    public DateTime? DeliveryDate { get; set; }
    public string? DueDateDateSave { get; set; }
    
    public bool Is30Days { get;  set; }
    public bool IsOverRuns { get;  set; }
    public bool IsCod { get;  set; }
    public int QtyAuthorisedOverruns { get;  set; }
    public decimal LabourCostRate { get;  set; }
    public List<OperationDto> Operations { get; set; } = new List<OperationDto>();
    public List<JobNoteDto> JobNotes { get; set; } = new List<JobNoteDto>();
    public long[]? CopyPurchasesId { get; set; }
}

public class CreateJobHandler : IRequestHandler<CreateJob, int>
{
    private readonly IApplicationDbContext _context;

    public CreateJobHandler(IApplicationDbContext context, IIdentityService identityService)
    {
        _context = context;
    }

    public async Task<int> Handle(CreateJob request, CancellationToken cancellationToken)
    {
        try {
            DateTime? dueDate;
            if (DateTime.TryParse(request.DueDateDateSave, out DateTime parsedDate))
            {
                dueDate = parsedDate;
            }
            else
            {
                dueDate = request.DueDate;
            }


            var lastJob = _context.Jobs.OrderByDescending(a => a.Id).Select(p => p).FirstOrDefault();
            var jobId = lastJob == null ? "00001" : (request.JobNumber).ToString().PadLeft(5, '0');
            
            //var jobId = lastJob == null ? "00001" : (lastJob.Id + 1).ToString().PadLeft(5, '0');
            //var jobNumber = lastJob == null ? 1 : (lastJob.Id + 1);

            var jobHdr =  _context.Jobs.Where(d=> d.JobNumber == request.JobNumber && !d.JobId.Contains("M-")).FirstOrDefault();

            if (jobHdr != null)
                throw new AlreadyExistsException("Job Number exists.");

            var newJob = new Job(request.JobNumber, request.Description, request.StartDate, dueDate, request.EstimatedHours
                        ,request.Quantity,request.DrawingNumber, request.RevisionNumber, request.ClientId, request.OrderNumber, request.Delivered
                        ,request.QuantityDelivered, request.SalePrice, request.JobTypeId , request.Notes , request.HeatNumber , request.MaterialMarkup 
                        ,request.LabourMarkup , request.SetupText, jobId, request.NcrNumber , request.CompletedBy, request.IsQoutedJob, request.IsByHour
                        ,request.SalePerUnit, request.SalesPrice, request.DeliveryCharge, request.TotalPrice, request.MaterialCost, request.LabourCost, request.OtherCost
                        ,request.TotalCost, request.ToBeInvoiced, request.InvoiceNumber, request.DeliveryDate,null, request.MaterialCostVariable, request.IsOverRuns
                        , request.Is30Days, request.IsCod, request.QtyAuthorisedOverruns, request.LabourCostRate);

            foreach (var jobNote in request.JobNotes) 
            {
                newJob.JobNotes.Add(new JobNote(newJob.Id, jobNote.Note , DateTime.UtcNow));
            }
        
             _context.Jobs.Add(newJob);


            foreach (var operation in request.Operations) 
            {
                var newOperator = new Operation(newJob.Id, operation.Number, operation.Description, 
                    operation.Quantity, operation.Priority, operation.Notes , operation.QuoteId, operation.ExpectedProcessTime
                    ,operation.Prog , operation.Set , operation.Run , operation.Other , operation.OperatorId , operation.DateCompleted
                    ,operation.Resource, operation.HourlyRate, operation.ResourceId);

                newOperator.setProcessInspection(operation.ProInsFirst1, operation.ProInsFirst2, operation.ProInsFirst3, operation.ProInsINS);
                newJob.Operations.Add(newOperator);
            }

            if (request.Copy && request.CopyPurchasesId.Length > 0) 
            {
                newJob.DomainEvents.Add(new CopyJobEvent(new CopyJobEventArgs
                {
                    JobId = jobId,
                    JobIdSource = request.JobIdSource,
                    CopyPurchasesId = request.CopyPurchasesId,
                }));
            }
            await _context.SaveChangesAsync(cancellationToken);
            return newJob.Id;

        } catch (Exception ex){
            throw ex;
        }
        
    }

    // public async Task OperationChildSaveHandler(IList<OperationResourceDto> operationResources, 
    //     IList<OperationOperatorDto> operationOperators, int operatorId, CancellationToken cancellationToken) 
    // {
    //     if (operationResources.Count() > 0) 
    //     {
    //         foreach (var resource in operationResources) {
    //             _context.OperationResources.Add(new OperationResource(operatorId, resource.ResourcesId));            
    //         }
    //     }
    //     if (operationOperators.Count() > 0) 
    //     {
    //         foreach (var operatordata in operationOperators) 
    //         {
    //             _context.OperationOperators.Add(new OperationOperator(operatorId, operatordata.UserId));    
    //         }
    //     }

    //     await _context.SaveChangesAsync(cancellationToken);
    // }
}
