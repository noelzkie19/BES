import { number, string } from "yup";
import { ActionEnum } from "../../../../_metronic/partials/widgets/grid/constant/ActionOption";
import { IAlert } from "../../../shared/components/CustomAlert";
import { GridSetup } from "../../../shared/model/grid-config";

export const TOASTER_DEFAULT: IAlert = {
    message: ``,
    header: ``,
    type: 'success'
}

export const Initial_GridSetup: GridSetup = {
    sort: [{ field: 'created', dir: 'desc' }],
    skip: 0,
    take: 35,
    filter: {
        logic: "and",
        filters: [],
    },
    filterOperators: {
        text: [
            {
                text: "grid.filterStartswithOperator",
                operator: "startswith",
            },
        ],
    }
}

export const FIELD_COLUMN_MAP = [
    { field: 'id', map: 'Purchase.PurchaseNumber' },
    { field: 'purchaseNumber', map: 'Purchase.PurchaseNumber', type: typeof '' },
    { field: 'description', map: 'PurchaseLine.Description', type: typeof '' },
    { field: 'displayJobId', map: 'displayJobId', type: typeof '' },
    { field: 'supplierName', map: 'Supplier.Name', type: typeof '' },
    { field: 'email', map: 'Supplier.email', type: typeof '' },
    { field: 'dateCreated', map: 'Supplier.Created', type: typeof '' },
    { field: 'created', map: 'Purchase.Created'},
    { field: 'purchaseDate', map: 'Purchase.Date', type: typeof '' },
    { field: 'printedDate', map: 'Purchase.PrintedDate', type: typeof '' },
    { field: 'dueDate', map: 'PurchaseLine.DueDate', type: typeof '' },
    { field: 'quantity', map: 'PurchaseLine.Quantity', type: typeof '' },
    { field: 'quantityReceived', map: 'PurchaseLine.QuantityReceived', type: typeof '' },
    { field: 'isCompleted', map: 'Purchase.IsCompleted', type: typeof '' }
]



export const optionColumns = [
    {
      field: "text",
      header: "Job No.",
      width: "100px",
    },
    {
      field: "description",
      header: "Description",
      width: "300px",
    }
  ];

export const FIELD_DEFAULT = { field: 'created', dir: 'desc' }; 
export const FILTER_DEFAULT = 'Purchase.Id > 0 '; 


export const Purchase_Line_Action: any[] = [
    // {text: ActionEnum.Edit, value: ActionEnum.Edit},
    {text: ActionEnum.Delete, value: ActionEnum.Delete},
    {text: ActionEnum.Rec, value: ActionEnum.Rec},
    {text: ActionEnum.Hist, value: ActionEnum.Hist}
]

export const Purchase_Action: any[] = [
    {text: ActionEnum.Edit, value: ActionEnum.Edit},
    {text: ActionEnum.Delete, value: ActionEnum.Delete}
]


export enum FIELD_PURCHASE_LIST {
    // action, 
    purchaseNumber,
    description,
    displayJobId,
    supplierName,
    purchaseDate,
    printedDate,
    dueDate,
    quantity,
    quantityReceived,
    isCompleted
  }
		
			    
export const FIELD_PURCHASE_COLUMN_KEY = [
    // { field: 'action', editable: false, width: 110 },
    { field: 'purchaseNumber', editable: false, width: 60 },
    { field: 'description', editable: false, width: undefined },
    { field: 'displayJobId', editable: false, width: 50 },
    { field: 'supplierName', editable: false, width: undefined },
    { field: 'purchaseDate', editable: false, width: 90 },
    { field: 'printedDate', editable: true, width: 50 },
    { field: 'dueDate', editable: true, width: 90},
    { field: 'quantity', editable: true, width: 65 },
    { field: 'quantityReceived', editable: true, width: 50 },
    { field: 'isCompleted', editable: false, width: 90 }
]



export enum FIELD_PURCHASE_LINE_LIST {
    action, 
    row,
    internal,
    jobId,
    description,
    quantity,
    quantityReceived,
    costEach,
    isIncludeGST,
    total,
    dueDate,
    isMaterialCertRequired,
    invoiceNumber
  }
		
			    
export const FIELD_PURCHASE_LINE_COLUMN_KEY = [
    { field: 'action', width: 95 },
    { field: 'row', width: 70 },
    { field: 'internal', width: 50 },
    { field: 'jobId', width: 120 },
    { field: 'description', width: 220 },
    { field: 'quantity', width: undefined },
    { field: 'quantityReceived', width: undefined },
    { field: 'costEach', width: undefined},
    { field: 'isIncludeGST', width: undefined },
    { field: 'costTotal', width: undefined },
    { field: 'dueDate', width: 130 },
    { field: 'isMaterialCertRequired', width: undefined },
    { field: 'invoiceNumber', width: undefined }
]

export enum ORDER_STATUS {
  ALL = 'All',
  OUTSTANDING = 'Outstanding',
  COMPLETED = 'Completed'
}
