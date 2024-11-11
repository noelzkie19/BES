using System;
using System.Collections.Generic;

namespace BES.Domain.Entities
{
    public class ClientEmailHistory : AuditableEntity
    {
        public ClientEmailHistory() {}
        public ClientEmailHistory(int clientId,DateTime emailDate, string emailType, string referenceNumber, string emailedBy, int fileStorageId)
        {
            ClientId = clientId;
            EmailDate =  emailDate;
            EmailType = emailType;
            ReferenceNumber = referenceNumber;
            EmailedBy = emailedBy;
            FileStorageId = fileStorageId;
        }
        
        public int ClientId { get; private set; } 
        public DateTime EmailDate { get; private set; }
        public string EmailType { get; private set; }
        public string ReferenceNumber { get; private set; }
        public string EmailedBy { get; private set; }
        public int FileStorageId { get; private set; }
        public virtual Client? Client { get; private set; }
    }
}