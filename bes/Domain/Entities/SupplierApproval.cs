using System;
using System.Collections.Generic;

namespace BES.Domain.Entities
{
    public class SupplierApproval : BaseEntity
    {
        public SupplierApproval(int supplierId, DateTime? initialDate, bool initialApproved, bool initialCritical, int? initialApprovedBy, DateTime? lastDate, 
            bool lastApproved, bool lastCritical, int? lastApprovedBy, DateTime? nextDate)
        {
           SupplierId = supplierId;
           InitialDate = initialDate;
           InitialApproved = initialApproved;
           InitialCritical = initialCritical;
           InitialApprovedBy = initialApprovedBy;
           LastDate = lastDate;
           LastApproved = lastApproved;
           LastCritical = lastCritical;
           LastApprovedBy = lastApprovedBy;
           NextDate = nextDate;
        }

        public void Update(DateTime? initialDate, bool initialApproved, bool initialCritical, int? initialApprovedBy, DateTime? lastDate, bool lastApproved, 
            bool lastCritical, int? lastApprovedBy, DateTime? nextDate)
        {
           InitialDate = initialDate;
           InitialApproved = initialApproved;
           InitialCritical = initialCritical;
           InitialApprovedBy = initialApprovedBy;
           LastDate = lastDate;
           LastApproved = lastApproved;
           LastCritical = lastCritical;
           LastApprovedBy = lastApprovedBy;
           NextDate = nextDate;
        }

        public int SupplierId { get; private set; }
        public DateTime? InitialDate { get; private set; }
        public bool InitialApproved { get; private set; }
        public bool InitialCritical { get; private set; }
        public int? InitialApprovedBy { get; private set; }

        public DateTime? LastDate { get; private set; }
        public bool LastApproved { get; private set; }
        public bool LastCritical { get; private set; }
        public int? LastApprovedBy { get; private set; }
        
        public DateTime? NextDate { get; private set; }

        public virtual Supplier? Supplier { get; private set; }
    }
}
