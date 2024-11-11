import {IColumns} from '../models/stock-model'

export const STOCK_COLUMN: IColumns[] = [
  {
    name: 'Client Name',
    selector: (row: any) => row.job.clientId,
    width: '',
  },
  {
    name: 'Description',
    selector: (row: any) => row.description,
    width: '20%',
  },
  {
    name: 'Drawing',
    selector: (row: any) => row.drawing,
    width: '',
  },
  {
    name: 'Revision',
    selector: (row: any) => row.revision,
    width: '',
  },
  {
    name: 'Qty',
    selector: (row: any) => row.quantity,
    width: '',
  },
  {
    name: 'Source / Destination Job',
    selector: (row: any) => row.job.jobNumber,
    width: '',
  },
  {
    name: 'Notes',
    selector: (row: any) => row.notes,
    width: '20%',
  },
]

export const PURCHASED_ORDER_COLUMN: IColumns[] = [
  {
    name: 'PO Number',
    selector: (row: any) => row.purchasedOrderNumber,
    width: '',
  },
  {
    name: 'Description',
    selector: (row: any) => row.description,
    width: '20%',
  },
  {
    name: 'Heat No.',
    selector: (row: any) => row.heatNumber,
    width: '',
  },
  {
    name: 'Purchased Date',
    selector: (row: any) => row.purchasedDate,
    width: '',
  },
  {
    name: 'Qty',
    selector: (row: any) => row.quantity,
    width: '',
  },
  {
    name: 'Each $',
    selector: (row: any) => row.each,
    width: '',
  },
  {
    name: 'Total $',
    selector: (row: any) => row.total,
    width: '',
  },
  {
    name: 'Recieved',
    selector: (row: any) => row.Recieved,
    width: '',
  },
]

export const JOB_OPERATION_COLUMN: IColumns[] = [
  {
    name: 'OP #',
    selector: (row: any) => row.operationNumber,
    width: '',
  },
  {
    name: 'Resouces',
    selector: (row: any) => row.resouces,
    width: '20%',
  },
]
