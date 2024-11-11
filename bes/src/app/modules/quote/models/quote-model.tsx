import {CompositeFilterDescriptor, SortDescriptor} from '@progress/kendo-data-query'
import {QuoteDetail} from './quote-detail'

export interface IColumns {
  name: string
  cell?: (...args: any) => {}
  selector?: any
  width: string
}

export interface IQuote {
  id?: number
  number: number
  date: string | Date
  estimationHours: number
  quantity: number
  drawingNumber: string
  revisionNumber: string
  estimationCost: number
  clientId: number
  jobId: number
  client?: any
  description: string
  quantityDelivered: number
  jobTypeId: number
  orderNumber: number
  ncrNumber: number
  startDate: Date | null | string
  dueDate: Date | null | string
  estimatedHours: number
  deliveryDate: Date | null | string
  setupText: string
  completedBy: string
  createdBy: string
  delivered: boolean
  materials: Material[]
  name: string
  quoteNumber: string
  paymentTerms: string
  estLeadTime: string
  costPerItem: number
  totalCost: number
  originalVersion: boolean
  quoteNumberSource: string
  version: boolean
  status: string
  latestVersion: string
  deletedMaterials?: any[]
  quoteVersion: any
  sourceId: number | null
  parentId: number | null
  resend: boolean
  datePrinted: Date | null | string
  jobNumber: number | null
  jobDescription: string

  details: QuoteDetail[]
}

export interface IEditData extends IQuote {
  materials: Material[]
}

export interface Material {
  id?: number
  description: string
  size: string
  supplierId: number
  numberOrdered: string
  orderDate: string | Date
  deliveryDate: string | Date
  name: string
  quantity: number
  unitPrice: number
  gst: boolean
  totalPrice: number
  isEdit: boolean
  isDeleted: boolean
  refId?: number // on save this need to trasform to id
}

export interface IQuoteSearch {
  id?: number
  search?: string
  number?: number
  date?: string
  estimationHours?: number
  quantity?: number
  drawingNumber?: string
  revisionNumber?: string
  estimationCost?: number
  clientId?: number
  jobId?: number
}
export interface IEditData extends IQuote {
  deletedMaterials?: Material[]
}
export interface ISelectedClientData {
  id?: number
  name: string
  street: string
  city: string
  state: string
  postCode: string
  suburb: string
  email: string
  contactPerson: string
}
export interface GridSetup {
  sort: Array<SortDescriptor>
  skip: number
  take: number
  filter: CompositeFilterDescriptor
}
export interface ISelectedJobTypeData {
  id: number
  description: string
}
export interface IEditData extends IQuote {
  deletedMaterials?: Material[]
}
