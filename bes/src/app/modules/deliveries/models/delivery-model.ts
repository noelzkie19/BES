export interface IDelivery {
  id?: number
  deliveryNumber: number
  date: Date
  supplierNumber: number
  freight: number
  exportMyob: boolean
  street?: string
  city?: string
  state?: string
  postCode?: string
  isCancelled: boolean
  notes?: string
}

export interface IDeliveryLine {
  id?: number
  deliveryLineNumber: number
  deliveryNumber: number
  jobNumber: number
  quantitySent: number
  balanceQuantity?: number
}

export interface IDeliveryData extends IDelivery {
  totalQuantityDelivered?: number
  createdBy?: string
  expanded: boolean
  jobDeliveryLines: DeliveryJob[]
}

export interface DeliveryJob {
  id: number
  jobNumber: number
  jobId: number
  deliveryId: number
  quantitySent: number
  clientId: number
  clientName: string
  orderNumber: string
  drawingNumber: string
  revisionNumber: string
  description: string
  quantity: number
  quantityDelivered: number
  dueDate: Date | null | string
  isSelected: boolean
  street?: string
  suburb?: string
  state?: string
  postCode?: string
  deliveryNumber?: number
  balanceQuantity?: number
  isEdit: boolean
  createdByName?: string
  supplierNumber: number
  notes: string
  freight: number
  contactPhone: string
  contactPerson: string
}

export interface IDeliveryPrintFilter {
  from: Date | null
  to: Date | null
  clientId: number
  sortBy: string
  isAllClient: boolean
  by: string
}

export interface IDeliveryReport {
  jobId: string
  description: string
  deliveryNumber: number
  clientName: string
  quantity: number
  date: Date
  price: number
}
