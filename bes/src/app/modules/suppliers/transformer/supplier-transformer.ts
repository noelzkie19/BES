import { SortDescriptor } from "@progress/kendo-data-query"
import { FIELD_COLUMN_MAP, FIELD_DEFAULT } from "../constant/config-defaults"
import { IAddressType } from "../models/config-model"
import { ISupplierAddress, ISupplierApproval, ISupplierContact } from "../models/supplier-model"
import { IStates } from "../../clients/models/config-model"


export const transforDataSupplierAddress = (address: ISupplierAddress[]) => {
    return (address || []).map((add) => ({
        refId: add.id, // for datatable id must be uniq for new
        default: add.default,
        addressType: add.addressType,
        street: add.street,
        suburb: add.suburb,
        state: add.state === null ? '' : add.state,
        postCode: add.postCode,
        postalAddress: add.postalAddress,
        postalSuburb: add.postalSuburb,
        postalState: add.postalState,
        postalPostCode: add.postalPostCode,
        isEdit: false,
        isDeleted: add.isDeleted
    }))
}

export const transforSaveSupplierAddress = (address: ISupplierAddress[]) => {
    return (address || []).map((add) => ({
        id: add.refId, // for datatable id must be uniq for new
        default: add.default,
        addressType: add.addressType,
        street: add.street,
        suburb: add.suburb,
        state: add.state === null ? '' : add.state,
        postCode: add.postCode,
        postalAddress: add.postalAddress,
        postalSuburb: add.postalSuburb,
        postalState: add.postalState,
        postalPostCode: add.postalPostCode,
        isEdit: false,
        isDeleted: add.isDeleted
    }))
}

export const transformDataSupplierContact = (contact: ISupplierContact[]) => {
    return (contact || []).map((add) => ({
        refId: add.id, // for datatable id must be uniq for new
        contactName: add.contactName,
        position: add.position,
        phone: add.phone,
        mobile: add.mobile,
        email: add.email,
        notes: add.notes,
        isEdit: false,
        isDeleted: add.isDeleted
    }))
}

export const transformSaveSupplierContact = (address: ISupplierContact[]) => {
    return (address || []).map((add) => ({
        id: add.refId, // for datatable id must be uniq for new
        contactName: add.contactName,
        position: add.position,
        phone: add.phone,
        mobile: add.mobile,
        email: add.email,
        notes: add.notes,
        isEdit: false,
        isDeleted: add.isDeleted
    }))
}

export const transformSaveSupplierApproval: any = (approval: ISupplierApproval) => {
    return {
        ...approval,
        initialApproved: (approval.initialApproved) ? approval.initialApproved : false, 
        initialCritical: (approval.initialCritical) ? approval.initialCritical : false, 
        lastApproved: (approval.lastApproved) ? approval.lastApproved : false, 
        lastCritical: (approval.lastCritical) ? approval.lastCritical : false, 
        initialDate: approval.initialDate === '' ? null : approval.initialDate,
        lastDate: approval.lastDate === '' ? null : approval.lastDate,
        nextDate: approval.nextDate === '' ? null : approval.nextDate,
        initialDateString: approval.initialDate === '' ? null : approval.initialDate?.toLocaleString(),
        lastDateString: approval.lastDate === '' ? null : approval.lastDate?.toLocaleString(),
        nextDateString: approval.nextDate === '' ? null : approval.nextDate?.toLocaleString()
    }
}

export const transformEmailHistorySort = (sort: SortDescriptor[]) => {
    const configSort: any = {
        ...sort[0],
        field: sort[0] ? sort[0].field : FIELD_DEFAULT.field,
        dir: sort[0] ? sort[0].dir : FIELD_DEFAULT.dir
    }
    const fieldMap = FIELD_COLUMN_MAP.find(cln => cln.field === configSort.field);
    const sortField = fieldMap ? fieldMap.map : configSort.field;
    return { ...configSort, field: sortField };
}

export const transformResourcesOption = (addressType: IAddressType[]) => {
    return (addressType || []).map((add) => ({
        text: add.value,
        id: add.value
    }))
  }

  export const transformStatesOption = (states: IStates[]) => {
    return (states || []).map((state) => ({
        value: state.code,
        label: `${state.value}`
    }))
}