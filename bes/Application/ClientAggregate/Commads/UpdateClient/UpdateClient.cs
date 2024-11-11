using MediatR;
using BES.Application.Common.Interfaces;
using BES.Domain.Entities;
using BES.Application.ClientAggregate.Model;
using BES.Application.Common.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace BES.Application.ClientAggregate.Commands.UpdateClient;
public class UpdateClient : IRequest<int>
{
    public int Id { get; set; }
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
    public List<ClientContactDto>? DeletedClientContacts { get; set; } = new List<ClientContactDto>();
}

public class UpdateClientHandler : IRequestHandler<UpdateClient, int>
{
    private readonly IApplicationDbContext _context;

    public UpdateClientHandler(IApplicationDbContext context, IIdentityService identityService)
    {
        _context = context;
    }

    public async Task<int> Handle(UpdateClient request, CancellationToken cancellationToken)
    {
        var client = await _context.Clients
                   .FindAsync(new object[] { request.Id }, cancellationToken);

        if (client == null) 
            throw new NotFoundException("Client does not exists.");

        // await ClientAddressesHandler(request.Id,
        //         request.ClientAddresses, 
        //         cancellationToken);
        await ClientContactHandler(request.Id,
                request.ClientContacts,
                request.DeletedClientContacts,
                cancellationToken);

        client.Update(request.Name, request.Phone, request.Fax, request.Email, 
            request.ContactPerson, request.OperatingHrs, request.ClientType, request.ShortName);
        _context.Clients.Update(client);

        var _address = await _context.ClientAddresses.FirstOrDefaultAsync(_address => _address.ClientId == request.Id);
        _address.Update(request.AddressType, request.Street, request.Suburb,
                request.State, request.PostCode, request.Default, request.PostalAddress, request.PostalSuburb, 
        request.PostalState, request.PostalPostCode);
        _context.ClientAddresses.Update(_address);

        await _context.SaveChangesAsync(cancellationToken);
        return client.Id;
    }

    // public async Task ClientAddressesHandler(int clientId,
    //         IList<ClientAddressDto> clientAddresses, 
    //         CancellationToken cancellationToken)
    // {

    //    foreach(var address in clientAddresses)
    //    {
    //         var _address = await _context.ClientAddresses
    //             .FindAsync(new object[] { address.Id }, cancellationToken);

    //         if (address.IsDeleted) {
    //            if (_address != null)
    //                 _context.ClientAddresses.Remove(_address);
    //         }
    //         else if (address.Id > 0)
    //         {
    //             if (_address != null) {
    //                 _address.Update(address.AddressType, address.Street, address.Suburb,
    //                         address.State, address.PostCode, address.Default);
    //                 _context.ClientAddresses.Update(_address);
    //             }
    //         }
    //         else if (address.Id == 0)
    //         {
    //             if (address != null)
    //                 _context.ClientAddresses.Add(
    //                     new ClientAddress(clientId, address.AddressType, address.Street, address.Suburb,
    //                         address.State, address.PostCode, address.Default));
    //         }
    //     }
    // }

    public async Task ClientContactHandler(int clientId,
           IList<ClientContactDto> clientContacts,
           IList<ClientContactDto>? deletedClientContacts,
           CancellationToken cancellationToken)
    {
        foreach (var contact in clientContacts)
        {
            if (contact.Id != null && contact.Id > 0)
            {
                var _contact = await _context.ClientContacts
                    .FindAsync(new object[] { contact.Id }, cancellationToken);
                if (_contact != null)
                {
                    _contact.Update(contact.ContactName, contact.Position, contact.Phone, contact.Mobile,
                            contact.Email, contact.Notes);
                    _context.ClientContacts.Update(_contact);
                }
            }
            else if (contact.Id == null || contact.Id == 0)
            {
                if (contact != null)
                    _context.ClientContacts.Add(
                        new ClientContact(clientId, contact.ContactName, contact.Position, contact.Phone, contact.Mobile,
                            contact.Email, contact.Notes));
            }
        }
        if (deletedClientContacts != null)
        {
            foreach (var contact in deletedClientContacts)
            {
                if (contact.Id != null && contact.Id > 0)
                {
                    var _address = await _context.ClientContacts
                            .FindAsync(new object[] { contact.Id }, cancellationToken);
                    if (_address != null)
                        _context.ClientContacts.Remove(_address);
                }
            }
        }
    }
    
}
