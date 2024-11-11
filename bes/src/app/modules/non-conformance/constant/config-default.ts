import { GridSetup, INonConformancePrintFilter } from "../models/config-model";


export enum FIELD_NONCONFORMANCE {
    // actions,
    ncrNumber,
    clientName,
    clientNcrNumber,
    dateRecorded,
    recordedBy,
    natureNotes,
    displayJobId,
    note
  }
  
export const Initial_GridSetup: GridSetup = {
    sort: [{ field: 'id', dir: 'desc' }],
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

export const FIELD_COLUMN_MAP = [
    { field: 'id', map: 'NonConformance.Id' },
    { field: 'ncrNumber', map: 'NonConformance.NcrNumber', type: typeof '' },
    { field: 'clientName', map: 'Client.Name', type: typeof '' },
    { field: 'clientNcrNumber', map: 'NonConformance.ClientNcrNumber', type: typeof '' },
    { field: 'dateRecorded', map: 'NonConformance.DateRecorded', type: typeof '' },
    { field: 'natureOfNonConference', map: 'NonConformance.NatureOfNonConference', type: typeof '' },
    { field: 'recordedBy', map: 'NonConformance.RecordedBy', type: typeof '' },
    { field: 'natureNotes', map: 'NonConformance.NatureNotes', type: typeof '' },
    { field: 'displayJobId', map: 'displayJobId', type: typeof '' },
    { field: 'note', map: 'NonConformance.Note', type: typeof '' }
]

export const FIELD_NONCONFORMANCE_COLUMN_KEY = [
    // { field: 'actions', editable: false, width: 80 },
    { field: 'ncrNumber', editable: false, width: undefined },
    { field: 'clientName', editable: false, width: undefined },
    { field: 'clientNcrNumber', editable: false, width: undefined },
    { field: 'dateRecorded', editable: false, width: undefined },
    { field: 'recordedBy', editable: false, width: undefined },
    { field: 'natureNotes', editable: false, width: undefined },
    { field: 'displayJobId', editable: false, width: undefined },
    { field: 'note', editable: false, width: undefined }
]


export const FIELD_DEFAULT = { field: 'id', dir: 'desc' }; 

export const PRINT_FILTER: INonConformancePrintFilter = {
    from: new Date(),
    to: new Date(),
    ncrNumber: '',
    sortBy: 'asc',
    isAllNcrNumber: false,
    by: 'Created'
}
