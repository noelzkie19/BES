export enum SUPPLIER_FIELD {
  // actions, 
  name,
  street,
  suburb,
  postCode,
  contactPerson,
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
  { field: 'Supplier.Name', editable: true, width: undefined },
  { field: 'SupplierAddress.Street', editable: true, width: undefined },
  { field: 'SupplierAddress.Suburb', editable: true, width: 100 },
  { field: 'SupplierAddress.PostCode', editable: true, width: 100 },
  { field: 'Supplier.ContactPerson', editable: true, width: undefined },
  { field: 'Supplier.Phone', editable: true, width: 100 },
  { field: 'Supplier.OperatingHrs', editable: true, width: 100 },
]
