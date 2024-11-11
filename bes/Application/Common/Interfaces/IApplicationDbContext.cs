using Microsoft.EntityFrameworkCore;
using BES.Domain.Entities;

namespace BES.Application.Common.Interfaces;

public interface IApplicationDbContext
{
    DbSet<Account> Accounts { get; }
    DbSet<ClientAddress> ClientAddresses { get; }
    DbSet<ClientContact> ClientContacts { get; }
    DbSet<Client> Clients { get; }
    DbSet<Stock> Stocks { get; }
    DbSet<Job> Jobs { get; }
    DbSet<Quote> Quotes { get; }
    DbSet<JobType> JobTypes { get; }
    DbSet<Operation> Operations { get; }
    DbSet<JobNote> JobNotes { get; }
    DbSet<UserAccount> UserAccounts { get; }
    DbSet<Supplier> Suppliers { get; }
    DbSet<SupplierAddress> SupplierAddresses { get; }
    DbSet<SupplierContact> SupplierContacts { get; }
    DbSet<SupplierApproval> SupplierApprovals { get; }
    DbSet<Delivery> Deliveries { get; }
    DbSet<DeliveryLine> DeliveryLines { get; }
    DbSet<Purchase> Purchases { get; }
    DbSet<PurchaseLine> PurchaseLines { get; }
    DbSet<PurchaseReceipt> PurchaseReceipts { get; }
    DbSet<Material> Materials { get; }
    DbSet<Schedule> Schedules { get; }
    DbSet<Resource> Resources { get; }
    // DbSet<OperationResource> OperationResources { get; }
    // DbSet<OperationOperator> OperationOperators { get; }
    DbSet<Machine> Machines { get; }
    DbSet<NonConformance> NonConformances { get; }
    DbSet<About> Abouts { get; }
    DbSet<FileStorage> FileStorages { get; }
    DbSet<SupplierEmailHistory> SupplierEmailHistories { get; }
    DbSet<ClientEmailHistory> ClientEmailHistories { get; }
    DbSet<NcrNumber> NcrNumbers { get; }
    DbSet<EmailAuth> EmailAuths { get; }
    DbSet<QuoteDetail> QuoteDetails { get; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
