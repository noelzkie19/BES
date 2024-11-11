using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using BES.Domain.Common;

namespace BES.Domain.Entities
{
    public class Delivery : AuditableEntity, IHasDomainEvent
    {
        public Delivery()
        {
            // Jobs = new HashSet<Job>();
            DeliveryLines = new HashSet<DeliveryLine>();
        }

        public Delivery(long deliveryNumber, DateTime date, long supplierNumber, string notes, decimal freight,
            bool exportMyob, string street, string city, string state, string postCode, bool isCancelled, string contactPerson,
            string contactPhone)
        {
            DeliveryNumber = deliveryNumber;
            Date = date;
            SupplierNumber = supplierNumber;
            Notes = notes;
            Freight = freight;
            ExportMyob = exportMyob;
            Street = street;
            City = city;
            State = state;
            PostCode = postCode;
            IsCancelled = isCancelled;
            ContactPerson = contactPerson;
            ContactPhone = contactPhone;
            
            // Jobs = new HashSet<Job>();
            DeliveryLines = new HashSet<DeliveryLine>();
        }

        public void Update(long deliveryNumber, DateTime date, long supplierNumber, string notes, decimal freight,
           bool exportMyob, string street, string city, string state, string postCode, bool isCancelled)
        {
            DeliveryNumber = deliveryNumber;
            Date = date;
            SupplierNumber = supplierNumber;
            Notes = notes;
            Freight = freight;
            ExportMyob = exportMyob;
            Street = street;
            City = city;
            State = state;
            PostCode = postCode;
            IsCancelled = isCancelled;
        }

        public long DeliveryNumber { get; private set; }
        public DateTime Date { get; private set; }
        public long SupplierNumber { get; private set; }
        public string? Notes { get; private set; }
        public decimal Freight { get; private set; }
        public bool ExportMyob { get; private set; }
        public string? Street { get; private set; }
        public string? City { get; private set; }
        public string? State { get; private set; }
        public string? PostCode { get; private set; }
        public bool IsCancelled { get; private set; }
        public string ContactPerson { get; private set; }
        public string ContactPhone { get; private set; }

        // public virtual ICollection<Job> Jobs { get; private set; }
        public virtual ICollection<DeliveryLine> DeliveryLines { get; private set; }
        
        [NotMapped]
        public List<DomainEvent> DomainEvents { get; set; } = new List<DomainEvent>();

    }
}
