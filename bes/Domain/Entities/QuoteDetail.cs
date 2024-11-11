using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
namespace BES.Domain.Entities
{
    public class QuoteDetail : AuditableEntity
    {
        public QuoteDetail()
        {
            
        }
        public QuoteDetail(string description, string drawing, string revision, int quantity, decimal costPerUnit,
           decimal totalCost, string estLeadTime, int quoteId)
        {
            Description = description;
            Drawing = drawing;
            Revision = revision;
            Quantity = quantity;
            CostPerUnit = costPerUnit;
            TotalCost = totalCost;
            EstLeadTime = estLeadTime;
            QuoteId = quoteId;
        }

        public void Update(string description, string drawing, string revision, int quantity, decimal costPerUnit,
           decimal totalCost, string estLeadTime)
        {
            Description = description;
            Drawing = drawing;
            Revision = revision;
            Quantity = quantity;
            CostPerUnit = costPerUnit;
            TotalCost = totalCost;
            EstLeadTime = estLeadTime;
        }
        public string Description { get; private set; } = null!;
        public string Drawing { get; private set; } = string.Empty;
        public string Revision { get; private set; } = string.Empty;
        public int Quantity { get; private set; }
        public decimal CostPerUnit { get; private set; }
        public decimal TotalCost { get; private set; }
        public string EstLeadTime { get; private set;} = string.Empty;
        public int QuoteId { get; private set; }
        public virtual Quote Quote { get; private set; } = null!;
    }
}
