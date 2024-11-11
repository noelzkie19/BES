export interface IClient {
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
  default: boolean
  addressType: string
  suburb: string
  postalAddress: string
  postalSuburb: string
  postalState: string
  postalPostCode: string
  contactNumber: string
  operatingHrs: string
  clientType: string
  shortName: string
}

export interface IClientAddress {
  id?: number // this id must set to refId
  default: boolean
  addressType: string
  street: string
  suburb: string
  state: string
  postCode: string
  refId?: number // on save this need to trasform to id
  isEdit: boolean
  isDeleted: boolean
}

export interface IClientContact {
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

export interface IClientData extends IClient {
  clientAddresses: IClientAddress[]
  clientContacts: IClientContact[]
}

export interface IEditData extends IClientData {
  deletedClientAddresses?: IClientAddress[]
  deletedclientContacts?: IClientContact[]
}

export interface IAccount {
  id: number
  name: string
  email: string
  type: string
}

export interface IClientSearch {
  search?: string
  clientId?: number
  clientName?: string
  suburb?: string
  postalCode?: string
  phone?: string
  contactPerson?: string
}
