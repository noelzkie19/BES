import { ActionEnum } from "../../../../_metronic/partials/widgets/grid/constant/ActionOption";
import { GridSetup } from "../models/config-model";
import { ICopyJobInfo, IJobReportPrintFilter } from "../models/job-model";


export const Initial_GridSetup: any = {
    sort: [{ field: 'Job.id', dir: 'desc' }],
    skip: 0,
    take: 35,
    filterOperators: {
        text: [
            {
                text: "grid.filterContainsOperator",
                operator: "contains",
            },
        ],
    }
}

export const FIELD_COLUMN_MAP = [
    { field: 'id', map: 'Job.Id' },
    { field: 'jobId', map: 'Job.JobId', type: typeof '' },
    { field: 'client', map: 'Client.Name', type: typeof '' },
    { field: 'drawingNumber', map: 'Job.DrawingNumber', type: typeof '' },
    { field: 'revisionNumber', map: 'Job.RevisionNumber', type: '' },
    { field: 'description', map: 'Job.Description', type: typeof '' },
    { field: 'status', map: 'Job.Delivered', type: typeof true },
    { field: 'jobType', map: 'JobType.Description', type: typeof '' },
    { field: 'quantity', map: 'Job.Quantity', type: typeof 0 },
    { field: 'quantityDelivered', map: 'Job.QuantityDelivered', type: typeof 0 },
    { field: 'delivered', map: 'Job.Delivered', type: typeof 0 },
    { field: 'dueDate', map: 'Job.DueDate', type: typeof Date },
    { field: 'orderNumber', map: 'Job.OrderNumber', type: typeof 0 }
]

export const FIELD_DEFAULT = { field: 'id', dir: 'desc' }; 

export const JOB_REPORT_PRINT_FILTER: IJobReportPrintFilter = {
    // from: new Date(),
    // to: new Date(),
    client: 0,
    sortBy: 'asc',
    isAllClient: true,
    by: 'Job.Created',
    jobType: 0,
    isAllJobType: true,
    skip: 0,
    take: 1000, 
    toBeInvoice: true
}

export const Copy_JOB_INFO: ICopyJobInfo = {
    isAllPo: true,
    isCopyOperation: true
}


export const Operator_Action: any[] = [
    {text: ActionEnum.Edit, value: ActionEnum.Edit},
    {text: ActionEnum.Delete, value: ActionEnum.Delete}
]


export const Job_List_Action: any[] = [
    {text: ActionEnum.Edit, value: ActionEnum.Edit},
    {text: ActionEnum.Delete, value: ActionEnum.Delete},
    {text: 'Job Card', value: ActionEnum.JobCard},
    {text: 'Copy Job', value: ActionEnum.CopyJob},
    {text: 'Confirm Job', value: ActionEnum.ConfirmJob},
    {text: 'Deliver Job', value: ActionEnum.Delivery},
]



export enum FIELD_JOB_LIST {
    expand,
    // action, 
    jobId,
    description,
    drawingNumber,
    revisionNumber,
    orderNumber,
    client,
    quantity,
    quantityDelivered,
    delivered,
    dueDate
  }
    
          
  export const FIELD_JOB_COLUMN_KEY = [
    { field: 'expand', editable: false, width: 50 },
    // { field: 'action', editable: false, width: 120 },
    { field: 'jobId', editable: false, width: 50 },
    { field: 'description', editable: false, width: undefined },
    { field: 'drawingNumber', editable: false, width: 90 },
    { field: 'revisionNumber', editable: false, width: 90 },
    { field: 'orderNumber', editable: true, width: 90 },
    { field: 'client', editable: true, width: undefined},
    { field: 'quantity', editable: true, width: 50 },
    { field: 'quantityDelivered', editable: true, width: 50 },
    { field: 'delivered', editable: true, width: 50 },
    { field: 'dueDate', editable: true, width: 90 }
  ]


  
export enum FIELD_OPERATION_LIST {
    action,
    number,
    quantity,
    resource,
    description,
    dateCompleted,
    expectedProcessTime,
    expectedProcessTimeText
  }
		
			    
export const FIELD_OPERATION_COLUMN_SIZE_KEY = [
    { field: 'action', width: 80 },
    { field: 'number', width: undefined },
    { field: 'quantity', width: undefined },
    { field: 'resourceId', width: undefined},
    { field: 'description', width: undefined},
    { field: 'dateCompleted', width: undefined},
    { field: 'expectedProcessTime', width: undefined},
    { field: 'expectedProcessTimeText', width: undefined}
]


export const FIELD_OPERATION_COLUMN_KEY = [
    { field: 'Operation', editable: false },
    { field: 'number', editable: true },
    { field: 'quantity', editable: true },
    { field: 'resourceId', editable: true },
    { field: 'description', editable: true },
    { field: 'dateCompleted', editable: true },
    { field: 'expectedProcessTime', editable: true },
    { field: 'expectedProcessTimeText', editable: true }
]


export const FIELD_PO_COLUMN_KEY = [
    { field: 'purchaseNumber', editable: false },
    { field: 'supplier', editable: false },
    { field: 'description', editable: true },
    { field: 'purchaseDate', editable: false },
    { field: 'quantity', editable: true },
    { field: 'costEach', editable: true },
    { field: 'costTotal', editable: true },
    { field: 'received', editable: false },
    // { field: 'dueDate', editable: true },
    // { field: 'createdBy', editable: false },
]



export enum FIELD_OPERATION_LIST_NEW {
    action,
    number,
    resource,
    quantity,
    description,
    expectedProcessTime,
    prog,
    set,
    run,
    other,
    operatorId,
    proInsFirst1,
    proInsFirst2,
    proInsFirst3,
    proInsINS
  }
			    

export const FIELD_OPERATION_COLUMN_KEY_NEW = [
    { field: 'number', width: 60, editable: true  },
    { field: 'resourceId', width: undefined, editable: true },
    { field: 'quantity', width: 50, editable: true  },
    { field: 'description', width: undefined, editable: true },
    { field: 'expectedProcessTime', width: 60, editable: true },
    { field: 'prog', width: 50, editable: true },
    { field: 'set', width: 50, editable: true },
    { field: 'run', width: 50, editable: true },
    { field: 'other', width: 50, editable: true },
    { field: 'operatorId',  editable: true },
    { field: 'proInsFirst1', width: 50, editable: false },
    { field: 'proInsFirst2', width: 50, editable: false },
    { field: 'proInsFirst3', width: 50, editable: false },
    { field: 'proInsINS', width: 50, editable: false }
]

export const FIELD_OPERATION_COLUMN_SIZE_KEY_NEW = [
    { field: 'action', width: 50, editable: false },
    ...FIELD_OPERATION_COLUMN_KEY_NEW
]
