using MediatR;
using BES.Application.Common.Interfaces;
using BES.Domain.Entities;
using BES.Application.SupplierAggregate.Model;
using BES.Application.Common.Exceptions;
using Microsoft.EntityFrameworkCore;
using BES.Application.PurchaseOrderAggregate.Models;

namespace BES.Application.SupplierAggregate.Commands.UpdateSupplier;
public class UpdateSupplier : IRequest<int>
{
    public int Id { get; set; }
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
    public SupplierApprovalDto SupplierApproval { get; set; } = new SupplierApprovalDto();
    // public List<SupplierAddressDto> SupplierAddresses { get; set; } = new List<SupplierAddressDto>();
    public List<SupplierContactDto> SupplierContacts { get; set; } = new List<SupplierContactDto>();
    public List<SupplierContactDto>? DeletedSupplierContacts { get; set; } = new List<SupplierContactDto>();
}

public class UpdateSupplierHandler : IRequestHandler<UpdateSupplier, int>
{
    private readonly IApplicationDbContext _context;

    public UpdateSupplierHandler(IApplicationDbContext context, IIdentityService identityService)
    {
        _context = context;
    }

    public async Task<int> Handle(UpdateSupplier request, CancellationToken cancellationToken)
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

        var supplier = await _context.Suppliers
                   .FindAsync(new object[] { request.Id }, cancellationToken) ?? throw new NotFoundException("Client does not exists.");

        // await SupplierAddressesHandler(request.Id,
        //         request.SupplierAddresses,
        //         cancellationToken);
        await SupplierContactHandler(request.Id,
                request.SupplierContacts,
                request.DeletedSupplierContacts,
                cancellationToken);

        supplier.Update(request.Name, request.Phone,
            request.Fax, request.Email, request.ContactPerson, request.OperatingHrs);
        _context.Suppliers.Update(supplier);

        var _address = await _context.SupplierAddresses.FirstOrDefaultAsync(_address => _address.SupplierId == request.Id);
        _address.Update(request.AddressType, request.Street, request.Suburb,
                request.State, request.PostCode, request.Default, request.PostalAddress, request.PostalSuburb, 
        request.PostalState, request.PostalPostCode);
        _context.SupplierAddresses.Update(_address);

        var approval = await _context.SupplierApprovals.FirstOrDefaultAsync(approval => approval.SupplierId == request.Id);

        if (approval is null) {
            var newApproval = new SupplierApproval(request.Id, initialDate, request.SupplierApproval.InitialApproved,
                request.SupplierApproval.InitialCritical, request.SupplierApproval.InitialApprovedBy, lastDate, request.SupplierApproval.LastApproved,
                request.SupplierApproval.LastCritical, request.SupplierApproval.LastApprovedBy, nextDate);
            _context.SupplierApprovals.Add(newApproval);
        } else {
            approval.Update(initialDate, request.SupplierApproval.InitialApproved,
                request.SupplierApproval.InitialCritical, request.SupplierApproval.InitialApprovedBy, lastDate, request.SupplierApproval.LastApproved,
                request.SupplierApproval.LastCritical, request.SupplierApproval.LastApprovedBy, nextDate);
            _context.SupplierApprovals.Update(approval);    
        }

        
        var purchaseOrders = _context.Purchases.Where(p => p.SupplierId == supplier.Id).ToList();
        await PurchaseOrderHandler(purchaseOrders, supplier , cancellationToken);
       
        await _context.SaveChangesAsync(cancellationToken);
        return supplier.Id;
    }

    public async Task SupplierAddressesHandler(int clientId,
            IList<SupplierAddressDto> supplierAddresses,
            CancellationToken cancellationToken)
    {


       foreach(var address in supplierAddresses)
       {
            var _address = await _context.SupplierAddresses
                .FindAsync(new object[] { address.Id }, cancellationToken);

            if (address.IsDeleted) {
               if (_address != null)
                    _context.SupplierAddresses.Remove(_address);
            }
            else if (address.Id > 0)
            {
                if (_address != null) {
                    _address.Update(address.AddressType, address.Street, address.Suburb,
                            address.State, address.PostCode, address.Default, address.PostalAddress, address.PostalSuburb, 
                    address.State, address.PostalPostCode);
                    _context.SupplierAddresses.Update(_address);
                }
            }
            else if (address.Id == 0)
            {
                if (address != null)
                    _context.SupplierAddresses.Add(
                        new SupplierAddress(clientId, address.AddressType, address.Street, address.Suburb,
                            address.State, address.PostCode, address.Default, address.PostalAddress, address.PostalSuburb, 
                    address.State, address.PostalPostCode));
            }
        }

        // foreach (var address in supplierAddresses)
        // {
        //     if (address.Id != null && address.Id > 0)
        //     {
        //         var _address = await _context.SupplierAddresses
        //             .FindAsync(new object[] { address.Id }, cancellationToken);
        //         if (_address != null)
        //         {
        //             _address.Update(address.AddressType, address.Street, address.Suburb,
        //                     address.State, address.PostCode, address.Default);
        //             _context.SupplierAddresses.Update(_address);
        //         }
        //     }
        //     else if (address.Id == null || address.Id == 0)
        //     {
        //         if (address != null)
        //             _context.SupplierAddresses.Add(
        //                 new SupplierAddress(clientId, address.AddressType, address.Street, address.Suburb,
        //                     address.State, address.PostCode, address.Default));
        //     }
        // }
        // if (deletedSupplierAddresses != null)
        // {
        //     foreach (var address in deletedSupplierAddresses)
        //     {
        //         if (address.Id != null && address.Id > 0)
        //         {
        //             var _address = await _context.SupplierAddresses
        //                     .FindAsync(new object[] { address.Id }, cancellationToken);
        //             if (_address != null)
        //                 _context.SupplierAddresses.Remove(_address);
        //         }
        //     }
        // }
    }

    public async Task SupplierContactHandler(int clientId,
           IList<SupplierContactDto> supplierContacts,
           IList<SupplierContactDto>? deletedSupplierContacts,
           CancellationToken cancellationToken)
    {
        foreach (var contact in supplierContacts)
        {
            if (contact.Id != null && contact.Id > 0)
            {
                var _contact = await _context.SupplierContacts
                    .FindAsync(new object[] { contact.Id }, cancellationToken);
                if (_contact != null)
                {
                    _contact.Update(contact.ContactName, contact.Position, contact.Phone, contact.Mobile,
                            contact.Email, contact.Notes);
                    _context.SupplierContacts.Update(_contact);
                }
            }
            else if (contact.Id == null || contact.Id == 0)
            {
                if (contact != null)
                    _context.SupplierContacts.Add(
                        new SupplierContact(clientId, contact.ContactName, contact.Position, contact.Phone, contact.Mobile,
                            contact.Email, contact.Notes));
            }
        }
        if (deletedSupplierContacts != null)
        {
            foreach (var contact in deletedSupplierContacts)
            {
                if (contact.Id != null && contact.Id > 0)
                {
                    var _address = await _context.SupplierContacts
                            .FindAsync(new object[] { contact.Id }, cancellationToken);
                    if (_address != null)
                        _context.SupplierContacts.Remove(_address);
                }
            }
        }
    }

    public async Task PurchaseOrderHandler(IList<Purchase> purchases, Supplier supplier, CancellationToken cancellationToken)
    {
        
        foreach(var purchase in purchases)
        {   
            if (purchase.Id > 0)
            { 
                 var _purchase = await _context.Purchases
                    .FindAsync(new object[] { purchase.Id }, cancellationToken);
               
               if(_purchase != null) {
                 bool isApprove = supplier.SupplierApproval != null || (supplier.SupplierApproval.InitialApproved || supplier.SupplierApproval.LastApproved) ? true : false ;
                _purchase.Update(purchase.SupplierId, purchase.Date, purchase.Printed, purchase.PrintedDate,
                purchase.FreightCost, purchase.Notes, purchase.ExportMyob, purchase.InternalNotes,
                purchase.InvoiceText,purchase.PoNotes, purchase.IsCourPlsReceivePays, purchase.IsBesArrCollection,
                purchase.IsCallReady, purchase.IsCallReadyQuoting, purchase.IsOthers, purchase.OtherNotes, isApprove);
                _context.Purchases.Update(_purchase);
               }
            
            }
        }
    }
}
