import { CompositeFilterDescriptor, SortDescriptor } from "@progress/kendo-data-query"

export interface ISupplier
{
    id?: number
    accountId: number
    name: string
    phone: string
    fax: string
    email: string
    contactPerson: string
    street: string
    city: string
    state: string
    postCode: string
    contactNumber: string
    operatingHrs: string
}

export interface ISupplierAddress
{
    id?: number // this id must set to refId
    default: boolean
    addressType: string
    street: string
    suburb: string
    state: string
    postCode: string
    postalAddress: string
    postalSuburb: string
    postalState: string
    postalPostCode: string
    refId?: number // on save this need to trasform to id
    isEdit: boolean
    isDeleted: boolean
}

export interface ISupplierContact
{
    id?: number // this id must set to refId
    contactName: string
    position: string
    phone: string
    mobile: string
    email: string
    notes: string
    refId?: number // on save this need to trasform to id
    isEdit: boolean
    isDeleted: boolean
}

export interface ISupplierApproval extends ISupplierApprovalDateString {
    id?: number // this id must set to refId
    supplierId: number | null
    initialDate: Date | undefined | string
    initialApproved: boolean | null
    initialCritical: boolean | null
    initialApprovedBy: number | null
    lastDate: Date | undefined | string
    lastApproved: boolean | null
    lastCritical: boolean | null
    lastApprovedBy: number | null
    nextDate: Date | undefined | string
}

export interface ISupplierApprovalDateString {
    initialDateString: string
    lastDateString: string
    nextDateString: string
}



export interface ISupplierReport {
    suppierName: string,
    approved: boolean,
    critical: boolean,
    lastReview?: Date | null,
    nextReview?: Date | null
}

export interface ISupplierEmailHistory
{
    id?: number // this id must set to refId
    emailDate: Date | undefined | string
    emailType: string
    referenceNumber: string
    emailedBy: string
    fileKey: string
    refId?: number // on save this need to trasform to id
    isEdit: boolean
}


export interface ISupplierData extends ISupplier 
{
    default: boolean
    addressType: string
    street: string
    suburb: string
    state: string
    postCode: string
    postalAddress: string
    postalSuburb: string
    postalState: string
    postalPostCode: string
    supplierApproval: ISupplierApproval
    supplierAddresses: ISupplierAddress []
    supplierContacts: ISupplierContact []
    supplierEmailHistories: ISupplierEmailHistory []
}


export interface IEditData extends ISupplierData
{
    deletedSupplierAddresses?: ISupplierAddress []
    deletedSupplierContacts?: ISupplierContact []
}

export interface ISupplierSearch
{
    skip?: number
    take?: number
    sort?: string
    filter?: string
    contactPerson?: string
    name?: string
    phone?: string
    fax?: string
    email?: string
    operatingHrs?: string
    search?: string
}


export interface IUser {
    id: number,
    userName: string
    firstName: string
    lastName: string
}

export interface GridSetupSupplierEmailHistory 
{
    sort: Array<SortDescriptor>
    skip: number
    take: number
    filter: CompositeFilterDescriptor
}