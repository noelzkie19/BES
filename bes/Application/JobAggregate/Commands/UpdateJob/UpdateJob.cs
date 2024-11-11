using MediatR;
using BES.Application.Common.Interfaces;
using BES.Domain.Entities;
using BES.Application.ClientAggregate.Model;
using BES.Application.Common.Exceptions;
using BES.Application.JobAggregate.Model;
using Microsoft.EntityFrameworkCore;

namespace BES.Application.JobAggregate.Commands.UpdateJob;
public class UpdateJob : IRequest<int>
{
    public int Id { get; set; } 
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
    public decimal MaterialCostVariable { get; set; }
    public bool Is30Days { get;  set; }
    public bool IsOverRuns { get;  set; }
    public bool IsCod { get;  set; }
    public int QtyAuthorisedOverruns { get;  set; }
    public DateTime? DeliveryDate { get; set; }
    public DateTime? JobDatePrinted { get; set; }
    public List<OperationDto> Operations { get; set; } = new List<OperationDto>();
    public List<JobNoteDto> JobNotes { get; set; } = new List<JobNoteDto>();
    public string? DueDateDateSave { get; set; }
    public decimal LabourCostRate { get;  set; }
    public List<JobPurchaseOrderDto> PurchaseOrder { get; set; } = new List<JobPurchaseOrderDto>();
}

public class UpdateJobHandler : IRequestHandler<UpdateJob, int>
{
    private readonly IApplicationDbContext _context;

    public UpdateJobHandler(IApplicationDbContext context, IIdentityService identityService)
    {
        _context = context;
    }
    public async Task<int> Handle(UpdateJob request, CancellationToken cancellationToken)
    {
        try {
            DateTime dueDate;
            var job = await _context.Jobs
                    .FindAsync(new object[] { request.Id }, cancellationToken);

            if (job == null) 
                throw new NotFoundException("Job does not exists.");

            DateTime.TryParse(request.DueDateDateSave, out dueDate);

            var year = request.JobDatePrinted.HasValue ? request.JobDatePrinted.Value.Year : 0;
            if (year < 1753) 
            {
                request.JobDatePrinted = null;
            }

            job.Update(request.Description, request.StartDate, dueDate.Year < 1753 ? null : dueDate, 
                request.EstimatedHours, request.Quantity, request.DrawingNumber , request.RevisionNumber , request.ClientId
                ,request.OrderNumber, request.Delivered, request.QuantityDelivered, request.SalePrice, request.JobTypeId
                ,request.Notes , request.HeatNumber , request.MaterialMarkup, request.LabourMarkup , request.SetupText, request.NcrNumber
                ,request.CompletedBy, request.IsQoutedJob, request.IsByHour, request.SalePerUnit, request.SalesPrice, request.DeliveryCharge
                ,request.TotalPrice, request.MaterialCost, request.LabourCost, request.OtherCost
                ,request.TotalCost, request.ToBeInvoiced, request.InvoiceNumber, request.DeliveryDate, request.MaterialCostVariable
                ,request.JobDatePrinted, request.IsOverRuns, request.Is30Days, request.IsCod, request.QtyAuthorisedOverruns, request.LabourCostRate);
            _context.Jobs.Update(job);
            await JobNotesHandler(request.Id, request.JobNotes, cancellationToken);
            await OperationsHandler(request.Id, request.Operations, cancellationToken);
            await PurchaseOrderHandler(request.PurchaseOrder, cancellationToken);

            await _context.SaveChangesAsync(cancellationToken);

            return job.Id;
        } catch (Exception ex){
            throw ex;
        }
      
    } 

    public async Task OperationsHandler(int jobId, IList<OperationDto> operations, CancellationToken cancellationToken)
    {

       foreach(var operation in operations)
        {
            var _operation = await _context.Operations
                                            .FindAsync(new object[] { operation.Id }, cancellationToken);


            if (operation.IsDeleted) {
               if (_operation != null) {
                   _context.Operations.Remove(_operation);
               }
            }
            else if (operation.Id > 0)
            {
                if (_operation != null) {
                    _operation.Update(jobId, operation.Number, operation.Description, operation.Quantity, operation.Priority
                            ,operation.Notes, operation.QuoteId , operation.ExpectedProcessTime, operation.Prog, operation.Set, operation.Run, operation.Other
                            ,operation.OperatorId ,operation.DateCompleted, operation.Resource, operation.HourlyRate, operation.ResourceId);
                    
                    _operation.setProcessInspection(operation.ProInsFirst1, operation.ProInsFirst2, operation.ProInsFirst3, operation.ProInsINS);
                    _context.Operations.Update(_operation);
                    // await _context.SaveChangesAsync(cancellationToken);
                    
                    // await OperationChildSaveHandler(operation.OperationResources, operation.OperationOperators, _operation.Id, cancellationToken);
                }
            }
            else if (operation.Id == 0)
            {
                if (operation != null) 
                {
                    var _newOperations = new Operation(jobId, operation.Number, operation.Description, operation.Quantity, operation.Priority
                        ,operation.Notes, operation.QuoteId , operation.ExpectedProcessTime, operation.Prog, operation.Set, operation.Run
                        ,operation.Other, operation.OperatorId ,operation.DateCompleted, operation.Resource, operation.HourlyRate, operation.ResourceId);
                     _newOperations.setProcessInspection(operation.ProInsFirst1, operation.ProInsFirst2, operation.ProInsFirst3, operation.ProInsINS);
                     _context.Operations.Add(_newOperations);
                    
                }
                   
            }
        }
       
    }

    public async Task JobNotesHandler(int jobId, IList<JobNoteDto> jobNotes,  CancellationToken cancellationToken)
    {
        foreach (var jobNote in jobNotes)
        {
            var _jobNote = await _context.JobNotes
                .FindAsync(new object[] { jobNote.Id }, cancellationToken);

            if (jobNote.IsDeleted) {
               if (_jobNote != null)
                    _context.JobNotes.Remove(_jobNote);
            }
            else if (jobNote.Id > 0)
            {
                if (_jobNote != null)
                {
                    _jobNote.Update(jobNote.Note, jobNote.Date);
                    _context.JobNotes.Update(_jobNote);
                }
            }
            else if (jobNote.Id == 0)
            {
                if (jobNote != null)
                    _context.JobNotes.Add(
                        new JobNote(jobId, jobNote.Note , jobNote.Date));
            }
        }
    }

    public async Task PurchaseOrderHandler(IList<JobPurchaseOrderDto> jobPurchaseOrders,  CancellationToken cancellationToken)
    {
        foreach (var purchase in jobPurchaseOrders)
        {
            var _jobPurchase = await _context.PurchaseLines
                .FindAsync(new object[] { purchase.Id }, cancellationToken);

            if (_jobPurchase != null)
             _jobPurchase.updateJobDetails(purchase.Description, purchase.DueDate, purchase.Quantity, purchase.CostEach, purchase.CostTotal);
        }
    }

    // public async Task OperationChildSaveHandler(IList<OperationResourceDto> operationResources, 
    //     IList<OperationOperatorDto> operationOperators, int operatorId, CancellationToken cancellationToken) 
    // {
    //     if (operationResources.Count() > 0) 
    //     {
    //         var resources = _context.OperationResources.Where(x => x.OperationId == operatorId);
    //         _context.OperationResources.RemoveRange(resources);

    //         foreach (var resource in operationResources) {
    //             _context.OperationResources.Add(new OperationResource(operatorId, resource.ResourcesId));            
    //         }
    //     }
    //     if (operationOperators.Count() > 0) 
    //     {
    //         var operators = _context.OperationOperators.Where(x => x.OperationId == operatorId);
    //         _context.OperationOperators.RemoveRange(operators);

    //         foreach (var operatordata in operationOperators) 
    //         {
    //             _context.OperationOperators.Add(new OperationOperator(operatorId, operatordata.UserId));    
    //         }
    //     }

    //     await _context.SaveChangesAsync(cancellationToken);
    // }
}
