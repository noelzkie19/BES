import { ActionEnum } from "../../../../_metronic/partials/widgets/grid/constant/ActionOption"
import { IAlert } from "../../../shared/components/CustomAlert"
import { GridSetup, ISuppierPrintFilter } from "../models/config-model"
import { GridSetupSupplierEmailHistory, ISupplierSearch } from "../models/supplier-model"

export const TOASTER_DEFAULT: IAlert = {
    message: ``,
    header: ``,
    type: 'success'
}

export const SEARCH_DEFAULT: ISupplierSearch = {
    skip: 0,
    take: 35,
    sort: '',
    filter: '',
    contactPerson: '',
    name: '',
    phone: '',
    fax: '',
    email: '',
    operatingHrs: '',
}


export const Initial_GridSetup: GridSetup = {
    sort: [{ field: 'Supplier.Name', dir: 'asc' }],
    skip: 0,
    take: 35,
    filter: {
        logic: "and",
        filters: [],
    },
    filterOperators: {
        text: [
            {
                text: "grid.filterContainsOperator",
                operator: "contains",
            },
        ],
    }
}

export const PRINT_FILTER: ISuppierPrintFilter = {
    from: new Date(),
    to: new Date(),
    supplier: 0,
    sortBy: 'asc',
    isAllSupplier: true,
    by: 'Supplier.Created'
}



export const Initial_GridSetup_SupplierEmail: GridSetupSupplierEmailHistory = {
    sort: [{ field: 'id', dir: 'desc' }],
    skip: 0,
    take: 35,
    filter: {
        logic: "and",
        filters: [],
    }
}



export const FIELD_DEFAULT = { field: 'id', dir: 'desc' }; 
export const FIELD_COLUMN_MAP = [
    { field: 'id', map: 'SupplierEmailHistory.Id' },
    { field: 'emailDate', map: 'SupplierEmailHistory.EmailDate', type: typeof '' },
    { field: 'emailType', map: 'SupplierEmailHistory.EmailType', type: typeof '' },
    { field: 'emailedBy', map: 'SupplierEmailHistory.EmailedBy', type: '' },
    { field: 'referenceNumber', map: 'SupplierEmailHistory.ReferenceNumber', type: typeof '' },
    { field: 'filePath', map: 'FileStorage.FileKey', type: typeof '' },
]


export const Supplier_Action: any[] = [
    {text: ActionEnum.Edit, value: ActionEnum.Edit},
    {text: ActionEnum.View, value: ActionEnum.View},
    {text: ActionEnum.Delete, value: ActionEnum.Delete}
]

export const Address_Action: any[] = [
    {text: ActionEnum.Edit, value: ActionEnum.Edit},
    {text: ActionEnum.Delete, value: ActionEnum.Delete}
]





export enum FIELD_ADDRESS_LIST {
    actions,
    default, 
    street,
    suburb,
    state,
    postalCode
  }
			    
export const FIELD_ADDRESS_KEY = [
    { field: 'actions', editable: false, width: 80 },
    { field: 'default', editable: false, width: 80 },
    { field: 'street', editable: false, width: undefined },
    { field: 'suburb', editable: false, width: undefined },
    { field: 'state', editable: false, width: undefined },
    { field: 'postCode', editable: false, width: undefined }
]


		
export enum FIELD_CONTACT_LIST {
    actions, 
    contactName,
    position,
    phone,
	mobile,
	email,
	notes
  }
		
			    
export const FIELD_CONTACT_KEY = [
    { field: 'actions', editable: false, width: 80 },
    { field: 'contactName', editable: false, width: undefined },
    { field: 'position', editable: false, width: undefined },
    { field: 'phone', editable: false, width: undefined },
	{ field: 'mobile', editable: false, width: undefined },
    { field: 'email', editable: false, width: undefined },
    { field: 'notes', editable: false, width: undefined }
]

export enum FIELD_HISTORY_LIST {
    emailDate,
    emailType,
    referenceNumber,
    sendName,
    filePath
 }
       
               
export const FIELD_HISTORY_KEY = [
   { field: 'emailDate', width: 80 },
   { field: 'emailType', width: undefined },
   { field: 'referenceNumber', width: undefined },
   { field: 'sendName', width: undefined },
   { field: 'filePath', width: undefined }
]

