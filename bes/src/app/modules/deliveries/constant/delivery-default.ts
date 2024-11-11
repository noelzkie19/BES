import {number} from 'yup'
import {DeliveryJob, IDeliveryLine} from '../models/delivery-model'

export const DELIVERY_JOB: DeliveryJob = {
  id: 0,
  jobNumber: 0,
  jobId: 0,
  deliveryId: 0,
  quantitySent: 0,
  clientId: 0,
  clientName: '',
  orderNumber: '',
  drawingNumber: '',
  revisionNumber: '',
  description: '',
  quantity: 0,
  quantityDelivered: 0,
  dueDate: null,
  isSelected: false,
  isEdit: false,
  supplierNumber: 0,
  notes: '',
  freight: 0,
  contactPerson: '',
  contactPhone: '',
}

export const DELIVERY_LINE_DEFAULT: IDeliveryLine = {
  id: 0,
  deliveryLineNumber: 0,
  deliveryNumber: 0,
  jobNumber: 0,
  quantitySent: 0,
}

export const PEND_FIELD_DEFAULT = {field: 'Job.Id', dir: 'desc'}
export const FIELD_DEFAULT = {field: 'Delivery.DeliveryNumber', dir: 'desc'}

export enum FIELD_DELIVERED {
  action,
  deliveryNumber,
  deliveryDate,
  createdByName,
  quantityDelivered,
  quantity,
  clientName,
  drawingNumber,
  description,
  jobId,
  // orderNumber,
  // revisionNumber,
  // dueDate,
}

export const FIELD_DELIVERED_COLUMN_KEY = [
  {field: 'action', editable: false, width: 50},
  {field: 'deliveryNumber', editable: false, width: 90},
  {field: 'deliveryDate', editable: false, width: 80},
  {field: 'createdByName', editable: false, width: 100},
  {field: 'quantitySent', editable: true, width: 60},
  {field: 'quantity', editable: true, width: 60},
  {field: 'clientName', editable: false, width: undefined},
  {field: 'drawingNumber', editable: true, width: 60},
  {field: 'description', editable: true, width: undefined},
  {field: 'jobId', editable: true, width: 60},
  // { field: 'orderNumber', editable: false, width: 60 },
  // { field: 'revisionNumber', editable: true, width: 60 },
  // { field: 'dueDate', editable: true, width: undefined },
]

export const FIELD_COLUMN_MAP = [
  {field: 'jobId', map: 'Job.JobId'},
  {field: 'description', map: 'Job.Description'},
  {field: 'clientName', map: 'Client.Name'},
  {field: 'drawingNumber', map: 'Job.drawingNumber'},
  {field: 'deliveryNumber', map: 'Delivery.DeliveryNumber'},
  {field: 'revisionNumber', map: 'Job.RevisionNumber'},
  {field: 'orderNumber', map: 'Job.OrderNumber'},
  {field: 'quantity', map: 'Job.Quantity'},
  {field: 'quantityDelivered', map: 'Job.QuantityDelivered'},
  {field: 'dueDate', map: 'Job.DueDate'},
  {field: 'deliveryDate', map: 'Delivery.date'},
  {field: 'date', map: 'Delivery.date'},
  {field: 'createdBy', map: 'UserAccount.lastName'},
  {field: 'totalQuantityDelivered', map: 'TotalQuantityDelivered'},
  {field: 'supplierNumber', map: 'Delivery.SupplierNumber'},
  {field: 'notes', map: 'Delivery.Notes'},
  {field: 'freight', map: 'Delivery.Freight'},
]
