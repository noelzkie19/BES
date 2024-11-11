import {IQuoteSearch, IQuote, GridSetup, Material} from '../models/quote-model'
import {IAlert} from '../../../shared/components/CustomAlert'
import {QuoteDetail} from '../models/quote-detail'
import {INewEditData} from '../models/new-qoute-model'

export const QUOTE_FORM_DEFAULT: IQuote = {
  id: 0,
  number: 0,
  date: new Date(),
  estimationHours: 0,
  quantity: 0,
  drawingNumber: '',
  revisionNumber: '',
  estimationCost: 0,
  clientId: 0,
  jobId: 0,
  quoteNumber: 'Q',
  description: '',
  quantityDelivered: 0,
  orderNumber: 0,
  ncrNumber: 0,
  deliveryDate: new Date(),
  startDate: new Date(),
  dueDate: new Date(),
  estimatedHours: 0,
  setupText: '',
  completedBy: '',
  createdBy: '',
  delivered: true,
  jobTypeId: 0,
  materials: [],
  deletedMaterials: [],
  name: '',
  paymentTerms: '',
  estLeadTime: '',
  costPerItem: 0,
  totalCost: 0,
  originalVersion: true,
  version: false,
  latestVersion: '',
  quoteNumberSource: '',
  quoteVersion: [],
  status: '',
  sourceId: 0,
  resend: false,
  parentId: null,
  datePrinted: null,
  jobNumber: null,
  jobDescription: '',
  details: [],
}

export const NEW_QUOTE_FORM_DEFAULT: INewEditData = {
  number: 0,
  clientId: 0,
  description: '',
  quoteNumber: '',
  quoteNumberSource: '',
  contactName: '',
  datePrinted: undefined,
  status: '',
  latestVersion: '',
  is30DaysFromInv: false,
  isCod: false,
  isDepositReceivedCOD: false,
  progressPaymentRequired: false,
  details: [],
  notes: '',
  totalVersion: 0,
}

export const TOASTER_DEFAULT: IAlert = {
  message: ``,
  header: ``,
  type: 'success',
}

export const SEARCH_DEFAULT: IQuoteSearch = {
  search: '',
  number: 0,
  date: '',
  estimationHours: 0,
  quantity: 0,
  drawingNumber: '',
  revisionNumber: '',
  estimationCost: 0,
  clientId: 0,
  jobId: 0,
}

export const Initial_GridSetup: any = {
  sort: [{field: 'id', dir: 'desc'}],
  skip: 0,
  take: 35,
}

export const MATERIAL_DEFAULT: Material = {
  description: '',
  size: '',
  supplierId: 0,
  numberOrdered: '',
  orderDate: new Date(),
  deliveryDate: new Date(),
  name: '',
  quantity: 1,
  unitPrice: 1,
  gst: false,
  totalPrice: 1,
  isEdit: true,
  isDeleted: false,
}

export const QUOTE_DETAIL_DEFAULT: QuoteDetail = {
  description: '',
  drawing: '',
  revision: '',
  quantity: 0,
  costPerUnit: 0,
  totalCost: 0,
  estLeadTime: '',
  isEdit: false,
  isDeleted: false,
}
