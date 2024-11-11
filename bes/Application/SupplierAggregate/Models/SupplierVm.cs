
using BES.Domain.Entities;
namespace BES.Application.SupplierAggregate.Model
{
    public class SupplierVm
    {
        public Supplier Supplier { get; set; }
        public SupplierApproval? SupplierApproval { get; set; }
        public SupplierAddress?  SupplierAddress { get; set; }
        public SupplierEmailHistory SupplierEmailHistories { get; set; }  = null!;
        public string? FileKey { get; set; } = null!;
    }
}