using System;
using System.Collections.Generic;

namespace BES.Domain.Entities
{
    public class SupplierEmailHistory : AuditableEntity
    {
        public SupplierEmailHistory() {}
        public SupplierEmailHistory(int supplierId,DateTime emailDate, string emailType, string referenceNumber, string emailedBy, int fileStorageId, string contentBody)
        {
            SupplierId = supplierId;
            EmailDate =  emailDate;
            EmailType = emailType;
            ReferenceNumber = referenceNumber;
            EmailedBy = emailedBy;
            FileStorageId = fileStorageId;
            ContentBody = contentBody;
        }
        
        public int SupplierId { get; private set; } 
        public DateTime EmailDate { get; private set; }
        public string EmailType { get; private set; }
        public string ReferenceNumber { get; private set; }
        public string EmailedBy { get; private set; }
        public int FileStorageId { get; private set; }
        public string ContentBody { get; private set; }
        public virtual Supplier? Supplier { get; private set; }
    }
}
