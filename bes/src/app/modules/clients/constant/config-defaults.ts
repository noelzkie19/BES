import { ActionEnum } from "../../../../_metronic/partials/widgets/grid/constant/ActionOption"
import { DataTypeEnum } from "../../../../_metronic/partials/widgets/grid/constant/IDataType"
import { IActionProps, ISelectedColumn } from "../../../../_metronic/partials/widgets/grid/props/IAction"
import { IGridSetup } from "../../../../_metronic/partials/widgets/grid/props/IList"
import { IAlert } from "../../../shared/components/CustomAlert"

export const TOASTER_DEFAULT: IAlert = {
    message: ``,
    header: ``,
    type: 'success'
}

export const Initial_GridSetup: IGridSetup = {
    sort: [{ field: 'Client.id', dir: 'desc' }],
    skip: 0,
    take: 30,
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
export const FILTER_DEFAULT = 'ClientEmailHistory.Id > 0 '; 



export const Client_Action: any[] = [
    {text: ActionEnum.Edit, value: ActionEnum.Edit},
    {text: ActionEnum.View, value: ActionEnum.View},
    {text: ActionEnum.Delete, value: ActionEnum.Delete}
]


export const Client_Action_Setup: any = {
    actionProps: {
        actions: [
            {text: ActionEnum.Edit, value: ActionEnum.Edit},
            {text: ActionEnum.Delete, value: ActionEnum.Delete},
            {text: ActionEnum.View, value: ActionEnum.View},
        ],
    },
    selectedColumns: [
        {columnName: 'name', columnTitle: 'Name', dataType: DataTypeEnum.Text},
        {columnName: 'phone', columnTitle: 'Phone', dataType: DataTypeEnum.Text},
        {columnName: 'contactPerson', columnTitle: 'Contact Person', dataType: DataTypeEnum.Text}
    ],
    gridSetup: {
        sort: [{ field: 'Client.id', dir: 'desc' }],
        skip: 0,
        take: 10,
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
}

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

