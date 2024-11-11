
import {  ISupplierAddress, ISupplierApproval, ISupplierContact, ISupplierData } from "../models/supplier-model"

export const SUPPLIER_FORM_DEFAULT: ISupplierData = {
    id: 0,
    accountId: 1,
    name: '',
    phone: '',
    fax: '',
    email: '',
    contactPerson: '',
    street: '',
    city: '',
    state: '',
    postCode: '',
    contactNumber: '',
    operatingHrs: '',
    default: true,
    addressType: '',
    suburb: '',
    postalAddress: '',
    postalSuburb: '',
    postalState: '',
    postalPostCode: '',
    supplierApproval: {
        id: 0,
        supplierId: 0,
        initialDate: undefined,
        initialApproved: false,
        initialCritical: false,
        initialApprovedBy: null,
        lastDate: undefined,
        lastApproved: false,
        lastCritical: false,
        lastApprovedBy: null,
        nextDate: undefined,
        initialDateString: '',
        lastDateString: '',
        nextDateString: '',
    },
    supplierAddresses: [],
    supplierContacts: [],
    supplierEmailHistories: []
}

export const SUPPLIER_ADDRESS_DEFAULT: ISupplierAddress = {
    default: false,
    addressType: '',
    street: '',
    suburb: '',
    state: '',
    postCode: '',
    postalAddress: '',
    postalSuburb: '',
    postalState: '',
    postalPostCode: '',
    refId: 0,
    isEdit: true,
    isDeleted: false
}

export const SUPPLIER_CONTACT_DEFAULT: ISupplierContact = {
    contactName: '',
    position: '',
    phone: '',
    mobile: '',
    email: '',
    notes: '',
    refId: 0,
    isEdit: true,
    isDeleted: false
}


export const SUPPLIER_APPROVAL_DEFAULT: ISupplierApproval = {
    supplierId: 0,
    initialDate: undefined,
    initialApproved: false,
    initialCritical: false,
    initialApprovedBy: null,
    lastDate: undefined,
    lastApproved: false,
    lastCritical: false,
    lastApprovedBy: null,
    nextDate: undefined,
    initialDateString: '',
    lastDateString: '',
    nextDateString: '',
}

