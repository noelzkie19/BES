using System.Reflection;
using BES.Application.Common.Interfaces;
using BES.Infrastructure.Identity;
using Duende.IdentityServer.EntityFramework.Options;
using MediatR;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using BES.Domain.Entities;
using BES.Infrastructure.Persistence.Interceptors;
using BES.Domain.Common;

namespace BES.Infrastructure.Persistence;

public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>, IApplicationDbContext
{
    private readonly IDateTime _dateTime;
    private readonly AuditableEntitySaveChangesInterceptor _auditableEntitySaveChangesInterceptor;
    private readonly IDomainEventService _domainEventService;
    public ApplicationDbContext(
        DbContextOptions<ApplicationDbContext> options,
        IOptions<OperationalStoreOptions> operationalStoreOptions,
        AuditableEntitySaveChangesInterceptor auditableEntitySaveChangesInterceptor,
        IDomainEventService domainEventService,
        IDateTime dateTime) : base(options, operationalStoreOptions)
    {
        _dateTime = dateTime;
        _domainEventService = domainEventService;
        _auditableEntitySaveChangesInterceptor = auditableEntitySaveChangesInterceptor;
    }

    public virtual DbSet<Account> Accounts => Set<Account>();
    public DbSet<Client> Clients => Set<Client>();
    public DbSet<ClientContact> ClientContacts => Set<ClientContact>();
    public DbSet<ClientAddress> ClientAddresses => Set<ClientAddress>();
    public DbSet<DateCriterion> DateCriteria => Set<DateCriterion>();
    public DbSet<DeliveryLine> DeliveryLines => Set<DeliveryLine>();
    public DbSet<DeliveryTemp> DeliveryTemps => Set<DeliveryTemp>();
    public DbSet<Job> Jobs => Set<Job>();
    public DbSet<JobType> JobTypes => Set<JobType>();
    public DbSet<Material> Materials => Set<Material>();
    public DbSet<Operation> Operations => Set<Operation>();
    public DbSet<JobNote> JobNotes => Set<JobNote>();
    public DbSet<Purchase> Purchases => Set<Purchase>();
    public DbSet<PurchaseLine> PurchaseLines => Set<PurchaseLine>();
    public DbSet<PurchaseReceipt> PurchaseReceipts => Set<PurchaseReceipt>();
    public DbSet<Quote> Quotes => Set<Quote>();
    public DbSet<QuoteDetail> QuoteDetails => Set<QuoteDetail>();
    public DbSet<Resource> Resources => Set<Resource>();
    public DbSet<Stock> Stocks => Set<Stock>();
    public DbSet<Supplier> Suppliers => Set<Supplier>();
    public DbSet<SupplierAddress> SupplierAddresses => Set<SupplierAddress>();
    public DbSet<SupplierContact> SupplierContacts => Set<SupplierContact>();
    public DbSet<SupplierApproval> SupplierApprovals => Set<SupplierApproval>();
    public DbSet<UserAccount> UserAccounts => Set<UserAccount>();
    public DbSet<Delivery> Deliveries => Set<Delivery>();
    public DbSet<Schedule> Schedules => Set<Schedule>();
    public DbSet<About> Abouts => Set<About>();
    // public DbSet<OperationResource> OperationResources => Set<OperationResource>();
    // public DbSet<OperationOperator> OperationOperators => Set<OperationOperator>();
    public DbSet<Machine> Machines => Set<Machine>();
    public DbSet<NonConformance> NonConformances => Set<NonConformance>();
    public DbSet<FileStorage> FileStorages => Set<FileStorage>();
    public DbSet<SupplierEmailHistory> SupplierEmailHistories => Set<SupplierEmailHistory>();
    public DbSet<ClientEmailHistory> ClientEmailHistories => Set<ClientEmailHistory>();
    public DbSet<NcrNumber> NcrNumbers => Set<NcrNumber>();
    public DbSet<EmailAuth> EmailAuths => Set<EmailAuth>();
    

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
    {
        // await _mediator.DispatchDomainEvents(this);
        var result = await base.SaveChangesAsync(cancellationToken);

        var events = ChangeTracker.Entries<IHasDomainEvent>()
             .Select(x => x.Entity.DomainEvents)
             .SelectMany(x => x)
             .Where(domainEvent => !domainEvent.IsPublished)
             .ToArray();

        await DispatchEvents(events);

        return result;

    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.AddInterceptors(_auditableEntitySaveChangesInterceptor);
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        base.OnModelCreating(builder);
    }

    private async Task DispatchEvents(DomainEvent[] events)
    {
        foreach (var @event in events)
        {
            @event.IsPublished = true;
            await _domainEventService.Publish(@event);
        }
    }
}
