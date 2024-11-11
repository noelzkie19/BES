
export enum CLIENT_FIELD {
    // actions, 
    name,
    contactPerson,
    street,
    suburb,
    postCode,
    phone,
    operatingHrs
  }

export const FIELD_ADDRESS_COLUMN_KEY = [
    { field: 'default', editable: false },
    { field: 'street', editable: true },
    { field: 'suburb', editable: true },
    { field: 'state', editable: true },
    { field: 'postCode', editable: true },
]

export const FIELD_CONTACT_COLUMN_KEY = [
    { field: 'contactName', editable: true },
    { field: 'position', editable: true },
    { field: 'phone', editable: true },
    { field: 'mobile', editable: true },
    { field: 'email', editable: true },
    { field: 'notes', editable: true },
]


export const FIELD_COLUMN_KEY = [
    // { field: 'actions', editable: true, width: undefined },
    { field: 'Client.Name', editable: true, width: undefined },
    { field: 'Client.contactPerson', editable: true, width: undefined },
    { field: 'ClientAddress.Street', editable: true, width: undefined },
    { field: 'ClientAddress.Suburb', editable: true, width: undefined },
    { field: 'ClientAddress.PostCode', editable: true, width: 100 },
    { field: 'Client.Phone', editable: true, width: 100 },
    { field: 'Client.OperatingHrs', editable: true, width: 120 },
]
