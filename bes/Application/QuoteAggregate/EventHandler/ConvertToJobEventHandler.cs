using BES.Application.Common.Exceptions;
using BES.Application.Common.Interfaces;
using BES.Application.Common.Models;
using BES.Domain.Events;
using MediatR;
using BES.Domain.Entities;

namespace BES.Application.QuoteAggregate.Events;

public class ConvertToJobEventHandler : INotificationHandler<DomainEventNotification<ConvertToJobEvent>>
{
    private readonly IApplicationDbContext _context;
    public ConvertToJobEventHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task Handle(DomainEventNotification<ConvertToJobEvent> notification, CancellationToken cancellationToken)
    {
        try 
        {
            var QuoteNumberSource = notification.DomainEvent.ConvertToJobEventArgs.QuoteNumberSource;
            var Description = notification.DomainEvent.ConvertToJobEventArgs.Description;
            var StartDate = notification.DomainEvent.ConvertToJobEventArgs.StartDate;
            var DueDate = notification.DomainEvent.ConvertToJobEventArgs.DueDate;
            var EstimatedHours = notification.DomainEvent.ConvertToJobEventArgs.EstimatedHours;
            var Quantity = notification.DomainEvent.ConvertToJobEventArgs.Quantity;
            var DrawingNumber = notification.DomainEvent.ConvertToJobEventArgs.DrawingNumber;
            var RevisionNumber = notification.DomainEvent.ConvertToJobEventArgs.RevisionNumber;
            var ClientId = notification.DomainEvent.ConvertToJobEventArgs.ClientId;
            var OrderNumber = notification.DomainEvent.ConvertToJobEventArgs.OrderNumber;
            var Delivered = notification.DomainEvent.ConvertToJobEventArgs.Delivered;
            var QuantityDelivered = notification.DomainEvent.ConvertToJobEventArgs.QuantityDelivered;
            var JobTypeId = notification.DomainEvent.ConvertToJobEventArgs.JobTypeId;
            var SetupText = notification.DomainEvent.ConvertToJobEventArgs.SetupText;
            var NcrNumber = notification.DomainEvent.ConvertToJobEventArgs.NcrNumber;
            var CompletedBy = notification.DomainEvent.ConvertToJobEventArgs.CompletedBy;
            var MaterialCostVariable = notification.DomainEvent.ConvertToJobEventArgs.MaterialCostVariable;
            var IsOverRuns = notification.DomainEvent.ConvertToJobEventArgs.IsOverRuns;
            var Is30Days = notification.DomainEvent.ConvertToJobEventArgs.Is30Days;
            var IsCod = notification.DomainEvent.ConvertToJobEventArgs.IsCod;
            var QtyAllowOverruns = notification.DomainEvent.ConvertToJobEventArgs.QtyAuthorisedOverruns;
            
            var Id =  notification.DomainEvent.ConvertToJobEventArgs.Id;
            decimal SalePerUnit = 0.0m;
            decimal SalePrice = 0.0m;
            decimal SalesPrice = 0.0m;
            var Notes = "";
            var HeatNumber = 0;
            var MaterialMarkup = 0;
            var LabourMarkup = 0;
            var IsQoutedJob = false;
            var IsByHour = true;
            var DeliveryDate = DateTime.Today;
            var DeliveryCharge = 0.0m;
            var TotalPrice = 0.0m;
            var MaterialCost = 0.0m;
            var LabourCost = 0.0m;
            var OtherCost = 0.0m;
            var TotalCost = 0.0m;
            var ToBeInvoiced = false;
            var InvoiceNumber = "0";
            var lastJob = _context.Jobs.OrderByDescending(a => a.Id)
                  .Select(p => p).FirstOrDefault();
        
            var jobId = lastJob == null ? "00001" : (lastJob.Id + 1).ToString().PadLeft(5, '0');
            var jobNumber = lastJob == null ? 1 : (lastJob.Id + 1);

            var convertToJob = new Job(jobNumber, Description, StartDate, DueDate
                , EstimatedHours, Quantity, DrawingNumber, RevisionNumber
                , ClientId, OrderNumber, Delivered, QuantityDelivered
                , SalePrice, JobTypeId, Notes,HeatNumber,MaterialMarkup
                , LabourMarkup,SetupText,jobId,NcrNumber,CompletedBy
                , IsQoutedJob, IsByHour, SalePerUnit, SalesPrice, DeliveryCharge
                , TotalPrice, MaterialCost, LabourCost, OtherCost
                , TotalCost, ToBeInvoiced, InvoiceNumber, DeliveryDate, Id
                , MaterialCostVariable, IsOverRuns, Is30Days, IsCod, QtyAllowOverruns,
                1);
            _context.Jobs.Add(convertToJob);
            await _context.SaveChangesAsync(cancellationToken);
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }
}