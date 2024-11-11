
export interface IStates {
  code: string
  value: string
  postal: string
}

export const FIELD_COLUMN_MAP = [
  { field: 'id', map: 'Id' },
  { field: 'name', map: 'Name', type: typeof ''  },
  { field: 'description', map: 'Description', type: typeof '' },
  { field: 'hourlyRate', map: 'HourlyRate', type: typeof 0 },
  { field: 'isActive', map: 'IsActive', type: typeof true},
]
export const FIELD_DEFAULT = { field: 'id', dir: 'desc' }; 
export const FILTER_DEFAULT = 'Id > 0 '; 
