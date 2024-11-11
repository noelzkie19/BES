using MediatR;
using BES.Application.Common.Interfaces;
using BES.Domain.Entities;
using BES.Application.ClientAggregate.Model;

namespace BES.Application.ClientAggregate.Commands.CreateClient;
public class CreateClient : IRequest<int>
{
    public string Name { get; set; } = null!;
    public string Phone { get; set; } = null!;
    public string Fax { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string ContactPerson { get; set; } = null!;
    public string OperatingHrs { get; set; } = null!;
    public string ClientType { get; set; } = null!;
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
    public string ShortName { get; set; } = null!;
    // public List<ClientAddressDto> ClientAddresses { get; set; } = new List<ClientAddressDto>();
    public List<ClientContactDto> ClientContacts { get; set; } = new List<ClientContactDto>();
}

public class CreateClientHandler : IRequestHandler<CreateClient, int>
{
    private readonly IApplicationDbContext _context;

    public CreateClientHandler(IApplicationDbContext context, IIdentityService identityService)
    {
        _context = context;
    }

    public async Task<int> Handle(CreateClient request, CancellationToken cancellationToken)
    {
        var newClient = new Client(request.Name, request.Phone, request.Fax, request.Email , 
            request.ContactPerson, request.OperatingHrs, request.ClientType, request.ShortName);

        newClient.ClientAddresses.Add(new ClientAddress(
            newClient.Id,
                request.AddressType, request.Street, request.Suburb,
                request.State, request.PostCode, request.Default, 
                request.PostalAddress, request.PostalSuburb, request.PostalState, 
                request.PostalPostCode));

        // foreach(var address in request.ClientAddresses)
        //     newClient.ClientAddresses.Add(new ClientAddress(
        //         newClient.Id,
        //         address.AddressType, address.Street, address.Suburb, 
        //         address.State, address.PostCode, address.Default));

        foreach (var contact in request.ClientContacts)
            newClient.ClientContacts.Add(new ClientContact(newClient.Id, contact.ContactName, contact.Position, contact.Phone, 
                    contact.Mobile, contact.Email, contact.Notes));

        _context.Clients.Add(newClient);
        
        await _context.SaveChangesAsync(cancellationToken);
        return newClient.Id;

    }
}
