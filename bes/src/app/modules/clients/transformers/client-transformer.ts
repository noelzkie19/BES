import {SortDescriptor} from '@progress/kendo-data-query'
import {IOption} from '../../users/models/user-model'
import {FIELD_COLUMN_MAP, FIELD_DEFAULT} from '../constant/config-map'
import {IClientAddress, IClientContact} from '../models/client-model'
import {IAddressType, IStates} from '../models/config-model'

export const transforDataClientAddress = (address: IClientAddress[]) => {
  return (address || []).map((add) => ({
    refId: add.id, // for datatable id must be uniq for new
    default: add.default,
    addressType: add.addressType,
    street: add.street,
    suburb: add.suburb,
    state: add.state,
    postCode: add.postCode,
    isEdit: false,
    isDeleted: add.isDeleted,
  }))
}

export const transforSaveClientAddress = (address: IClientAddress[]) => {
  return (address || []).map((add) => ({
    id: add.refId, // for datatable id must be uniq for new
    default: add.default,
    addressType: add.addressType,
    street: add.street,
    suburb: add.suburb,
    state: add.state,
    postCode: add.postCode,
    isEdit: false,
    isDeleted: add.isDeleted,
  }))
}

export const transformDataClientContact = (contact: IClientContact[]) => {
  return (contact || []).map((add) => ({
    refId: add.id, // for datatable id must be uniq for new
    contactName: add.contactName,
    position: add.position,
    phone: add.phone,
    mobile: add.mobile,
    email: add.email,
    notes: add.notes,
    isEdit: false,
    isDeleted: add.isDeleted,
  }))
}

export const transformResourcesOption = (addressType: IAddressType[]) => {
  return (addressType || []).map((add) => ({
    text: add.value,
    id: add.value,
  }))
}

export const transformSaveClientContact = (address: IClientContact[]) => {
  return (address || []).map((add) => ({
    id: add.refId, // for datatable id must be uniq for new
    contactName: add.contactName,
    position: add.position,
    phone: add.phone,
    mobile: add.mobile,
    email: add.email,
    notes: add.notes,
    isEdit: false,
    isDeleted: add.isDeleted,
  }))
}
export const transformClientEmailHistorySort = (sort: SortDescriptor[]) => {
  const configSort: any = {
    ...sort[0],
    field: sort[0] ? sort[0].field : FIELD_DEFAULT.field,
    dir: sort[0] ? sort[0].dir : FIELD_DEFAULT.dir,
  }
  const fieldMap = FIELD_COLUMN_MAP.find((cln) => cln.field === configSort.field)
  const sortField = fieldMap ? fieldMap.map : configSort.field
  return {...configSort, field: sortField}
}
export const transformClientFilter = (filter: any) => {
  if (!filter) return filter

  let newFilter = (filter.filters || []).map((ft: any) => {
    const fieldMap = FIELD_COLUMN_MAP.find((cln) => cln.field === ft.field)

    ft = {
      ...ft,
      field: fieldMap?.map,
      type: fieldMap?.type,
    }
    return ft
  })

  return {...filter, filters: newFilter}
}

export const transformStatesOption = (states: IStates[]) => {
  return (states || []).map((state) => ({
    value: state.code,
    label: `${state.value}`,
  }))
}
