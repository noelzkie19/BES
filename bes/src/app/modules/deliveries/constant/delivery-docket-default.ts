
export enum FIELD_DOCKET {
  jobId,
  description,
  quantitySent,
}
export const FIELD_DOCKET_COLUMN_KEY = [
  { field: 'jobId', editable: false, width: '80' },
  { field: 'description', editable: false, width: undefined },
  { field: 'quantitySent', editable: true, width: '80' },
]
