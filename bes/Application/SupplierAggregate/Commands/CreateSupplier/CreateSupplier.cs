using MediatR;
using BES.Application.Common.Interfaces;
using BES.Domain.Entities;
using BES.Application.ClientAggregate.Model;
using BES.Application.SupplierAggregate.Model;

namespace BES.Application.SupplierAggregate.Commands.CreateSupplier;
public class CreateSupplier : IRequest<int>
{
    public string Name { get; set; } = null!;
    public string Phone { get; set; } = null!;
    public string Fax { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string ContactPerson { get; set; } = null!;
    public string OperatingHrs { get; set; } = null!;
    public bool Default { get; set; }
    public string AddressType { get; set; } = null!;
    public string Street { get; set; } = null!;
    public string Suburb { get; set; } = null!;
    public string State { get; set; } = null!;
    public string PostCode { get; set; } = null!;
    public string PostalAddress { get; set; } = null!;
    public string PostalSuburb { get; set; } = null!;
    public string PostalState { get; set; } = null!;
    public string PostalPostCode { get; set; } = null!;
    // public List<SupplierAddressDto> SupplierAddresses { get; set; } = new List<SupplierAddressDto>();
    public List<SupplierContactDto> SupplierContacts { get; set; } = new List<SupplierContactDto>();
    public SupplierApprovalDto SupplierApproval { get; set; } = new SupplierApprovalDto();
}

public class CreateSupplierHandler : IRequestHandler<CreateSupplier, int>
{
    private readonly IApplicationDbContext _context;

    public CreateSupplierHandler(IApplicationDbContext context, IIdentityService identityService)
    {
        _context = context;
    }

    public async Task<int> Handle(CreateSupplier request, CancellationToken cancellationToken)
    {
        try
        {
            DateTime? initialDate;
            DateTime? lastDate;
            DateTime? nextDate;

            if (DateTime.TryParse(request.SupplierApproval.InitialDateString, out DateTime InitParsedDate))
            {
                initialDate = InitParsedDate;
            }
            else
            {
                initialDate = request.SupplierApproval.InitialDate;
            }
            if (DateTime.TryParse(request.SupplierApproval.LastDateString, out DateTime LastparsedDate))
            {
                lastDate = LastparsedDate;
            }
            else
            {
                lastDate = request.SupplierApproval.InitialDate;
            }
            if (DateTime.TryParse(request.SupplierApproval.NextDateString, out DateTime NextparsedDate))
            {
                nextDate = NextparsedDate;
            }
            else
            {
                nextDate = request.SupplierApproval.InitialDate;
            }

            var newSupplier = new Supplier(request.Name, request.Phone,
                request.Fax, request.Email, request.ContactPerson, request.OperatingHrs);

            newSupplier.SupplierAddresses.Add(new SupplierAddress(
                newSupplier.Id,
                request.AddressType, request.Street, request.Suburb,
                request.State, request.PostCode, request.Default, 
                request.PostalAddress, request.PostalSuburb, request.PostalState, 
                request.PostalPostCode));
                
            foreach (var contact in request.SupplierContacts)
                newSupplier.SupplierContacts.Add(new SupplierContact(newSupplier.Id, contact.ContactName, contact.Position, contact.Phone,
                        contact.Mobile, contact.Email, contact.Notes));

            _context.Suppliers.Add(newSupplier);
            await _context.SaveChangesAsync(cancellationToken);

            var newApproval = new SupplierApproval(newSupplier.Id, initialDate, request.SupplierApproval.InitialApproved, 
                request.SupplierApproval.InitialCritical, request.SupplierApproval.InitialApprovedBy, lastDate, request.SupplierApproval.LastApproved, 
                request.SupplierApproval.LastCritical, request.SupplierApproval.LastApprovedBy, nextDate);
                        
            _context.SupplierApprovals.Add(newApproval);
            await _context.SaveChangesAsync(cancellationToken);
            return newSupplier.Id;
        }
        catch(Exception ex) 
        {
            throw ex;
        }
        

    }
}
