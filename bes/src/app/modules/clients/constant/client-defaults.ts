import {GridSetupClientEmailHistory} from '../models/client-emailhistory'
import {IClientAddress, IClientContact, IClientData, IClientSearch} from '../models/client-model'

export const CLIENT_FORM_DEFAULT: IClientData = {
  id: 0,
  accountId: 1,
  name: '',
  phone: '',
  fax: '61',
  email: '',
  contactPerson: '',
  street: '',
  city: '',
  state: '',
  postCode: '',
  default: true,
  addressType: '',
  suburb: '',
  postalAddress: '',
  postalSuburb: '',
  postalState: '',
  postalPostCode: '',
  contactNumber: '',
  operatingHrs: '',
  clientAddresses: [],
  clientContacts: [],
  clientType: '',
  shortName: '',
}

export const CLIENT_ADDRESS_DEFAULT: IClientAddress = {
  default: false,
  addressType: '',
  street: '',
  suburb: '',
  state: '',
  postCode: '',
  refId: 0,
  isEdit: true,
  isDeleted: false,
}

export const CLIENT_CONTACT_DEFAULT: IClientContact = {
  contactName: '',
  position: '',
  phone: '',
  mobile: '',
  email: '',
  notes: '',
  refId: 0,
  isEdit: true,
  isDeleted: false,
}

export const SEARCH_DEFAULT: IClientSearch = {
  search: '',
  clientName: '',
  suburb: '',
  postalCode: '',
  phone: '',
  contactPerson: '',
}

export const Initial_GridSetup_ClientEmail: GridSetupClientEmailHistory = {
  sort: [{field: 'id', dir: 'desc'}],
  skip: 0,
  take: 10,
  filter: {
    logic: 'and',
    filters: [],
  },
}
