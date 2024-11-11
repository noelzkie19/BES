export const FIELD_DEFAULT = { field: 'id', dir: 'desc' }; 
export const FIELD_COLUMN_MAP = [
    { field: 'id', map: 'ClientEmailHistory.Id' },
    { field: 'emailDate', map: 'ClientEmailHistory.EmailDate', type: typeof '' },
    { field: 'emailType', map: 'ClientEmailHistory.EmailType', type: typeof '' },
    { field: 'emailedBy', map: 'ClientEmailHistory.EmailedBy', type: '' },
    { field: 'referenceNumber', map: 'ClientEmailHistory.ReferenceNumber', type: typeof '' },
    { field: 'filePath', map: 'FileStorage.FileKey', type: typeof '' },
]