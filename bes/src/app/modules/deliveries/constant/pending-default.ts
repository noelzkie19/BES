
export enum FIELD_PENDING {
    isSelected, 
    qtyToSend,
    clientName,
    orderNumber,
    jobId,
    drawingNumber,
    revisionNumber,
    description,
    quantity,
    quantityDelivered,
    dueDate
  }
export const FIELD_PENDING_DELIVERY_COLUMN_KEY = [
    { field: 'isSelected', editable: false, width: 40 },
    { field: 'qtyToSend', editable: false, width: 65 },
    { field: 'clientName', editable: false, width: undefined },
    { field: 'orderNumber', editable: false, width: 80 },
    { field: 'jobId', editable: true, width: 80 },
    { field: 'drawingNumber', editable: true, width: 80 },
    { field: 'revisionNumber', editable: true, width: 80 },
    { field: 'description', editable: true, width: undefined },
    { field: 'quantity', editable: true, width: 50 },
    { field: 'quantityDelivered', editable: true, width: 50 },
    { field: 'dueDate', editable: true, width: 80 }
]



