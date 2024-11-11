import { IAlert } from "../../../shared/components/CustomAlert"
import { GridSetup } from "../../../shared/model/grid-config"


export const Initial_GridSetup: GridSetup = {
    sort: [{ field: 'Job.Id', dir: 'desc' }],
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

export const Initial_AllocatedGridSetup: GridSetup = {
    sort: [{ field: 'Job.Id', dir: 'desc' }],
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


export const INITIAL_OPERATOR_SORT: any = {
    field: "number",
    dir: "asc"
}


export const TOASTER_DEFAULT: IAlert = {
    message: ``,
    header: ``,
    type: 'success'
}


export const FIELD_COLUMN_MAP = [
    { field: 'jobId', map: 'Job.JobId', type: typeof '' },
    { field: 'description', map: 'Job.Description', type: typeof '' },
    { field: 'client', map: 'Client.Name', type: typeof '' },
    { field: 'dueDate', map: 'Job.DueDate', type: typeof new Date()},
    { field: 'notes', map: 'Schedule.Notes', type: typeof '' },
]

export const FIELD_DEFAULT = { field: 'Job.JobId', dir: 'desc' }; 


export enum FIELD_UNALLOCATED_LIST {
    jobId,
    description,
    clientName,
    assignee
  }
		
			    
export const FIELD_UNALLOCATED_KEY = [
    { field: 'jobId', editable: false, width: undefined },
    { field: 'description', editable: false, width: undefined },
    { field: 'clientName', editable: false, width: undefined },
    { field: 'assignee', editable: false, width: undefined }
]


export enum FIELD_ALLOCATED_LIST {
    expand,
    isUrgent, 
    jobId,
    description,
    client,
    notes,
	dueDate
  }
		
			    
export const FIELD_ALLOCATED_KEY = [
    { field: 'expand', editable: false, width: 10 },
    { field: 'isUrgent', editable: false, width: 100 },
    { field: 'jobId', editable: false, width: undefined },
    { field: 'description', editable: false, width: undefined },
    { field: 'client', editable: false, width: undefined },
    { field: 'notes', editable: false, width: undefined },
    { field: 'dueDate', editable: false, width: undefined }
]
