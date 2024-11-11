import { IPurchaseReceipt } from "../../purchase-orders/models/purchase-model"

export interface IColumns {
  name: string
  cell?: (...args: any) => {}
  selector?: any
  width: string
}

export interface Job {
  id: number,
  jobNumber: number,
  deliveryId: number,
  description: string,
  startDate: Date | null | string,
  dueDate: Date | null | string,
  estimatedHours: number,
  quantity: number
  drawingNumber: string,
  revisionNumber: string,
  clientId: number,
  orderNumber: string,
  delivered: boolean,
  quantityDelivered: number,
  salesPrice: number,
  jobTypeId: number,
  notes: string,
  heatNumber: number,
  materialMarkUp: number,
  labourMarkUp: number,
  setupText: string,
  jobCardPrinted: Date | null | string,
  jobId: number,
  ncrNumber: string,
  deliveryDate: Date | null | string,
  completedBy: string,
  isQoutedJob: boolean,
  isByHour: boolean
  salePerUnit: number,
  deliveryCharge: number,
  totalPrice: number,
  materialCost: number,
  labourCost: number,
  otherCost: number,
  totalCost: number,
  toBeInvoiced: boolean,
  invoiceNumber: string,
  parentJobNumber?: number,
  quoteNumberSource?: number,
  materialCostVariable: number,
  totalMaterialCost: number,
  jobDatePrinted: Date | null,
  isOverruns: boolean,
  qtyAuthorisedOverruns: number,
  is30Days: boolean,
  isCod: boolean,
  labourCostRate: number,
  del: number,
  isDuplicate: boolean
}


export interface JobSubAssembly {
  id: number,
  parentJobNumber: number,
  subJobId: number,
  jobNumber: number,
  deliveryId: number,
  description: string,
  startDate: Date | null | string,
  dueDate: Date | null | string,
  estimatedHours: number,
  quantity: number
  drawingNumber: number,
  revisionNumber: number,
  clientId: number,
  orderNumber: number,
  delivered: boolean,
  quantityDelivered: number,
  salesPrice: number,
  jobTypeId: number,
  notes: string,
  heatNumber: number,
  materialMarkUp: number,
  labourMarkUp: number,
  setupText: string,
  jobCardPrinted: Date | null | string,
  jobId: number,
  ncrNumber: number,
  deliveryDate: Date | null | string,
  completedBy: string,
  isQoutedJob: boolean,
  isByHour: boolean
  salePerUnit: number,
  deliveryCharge: number,
  totalPrice: number,
  materialCost: number,
  labourCost: number,
  otherCost: number,
  totalCost: number,
  toBeInvoiced: boolean,
  invoiceNumber: string
}

export interface Operation {
  id?: number,
  number: number,
  description: string,
  dateCompleted: Date | null | string,
  hours: number,
  quantity: number,
  priority: number,
  notes: string,
  progDone: boolean,
  quoteId: number,
  expectedProcessTime: number | null,
  expectedProcessTimeText?: string,
  prog: number,
  set: number,
  run: number,
  other: number,
  operatorId: number | null,
  refId?: number // on save this need to trasform to id,
  isEdit: boolean
  isDeleted: boolean,
  resource: string,
  resourceId: number | null,
  // firstFocHr: number
  // firstFocOperatorId: number
  // secondFocHr: number
  // secondFocOperatorId: number
  // thirdFocHr: number
  // thirdFocOperatorId: number
  // fourthFocHr: number
  // fourthFocOperatorId: number
  // firstPcHr: number
  // firstPcOperatorId: number
  // secondPcHr: number
  // secondPcOperatorId: number
  // thirdPcHr: number
  // thirdPcOperatorId: number
  // fourthPcHr: number
  // fourthPcOperatorId: number
  hourlyRate: number
  proInsFirst1: boolean,
  proInsFirst2: boolean,
  proInsFirst3: boolean,
  proInsINS: boolean
}


export interface OperationResource {
  resourcesId: number
  operationId: number
}

export interface OperationOperator {
  userId: number
  operationId: number
}



export interface JobNote {
  id?: number
  note: string
  date: Date | null | string
  createdBy: string
  refId?: number // on save this need to trasform to id,
  isEdit: boolean,
  isDeleted: false,
  createdByName?: string
}


export interface ProductCategory {
  CategoryID?: number
  CategoryName?: string
  Description?: string
  details?: any
}

export interface Product {
  ProductID: number
  ProductName?: string
  SupplierID?: number
  CategoryID?: number
  QuantityPerUnit?: string
  UnitPrice?: number
  UnitsInStock?: number
  UnitsOnOrder?: number
  ReorderLevel?: number
  Discontinued?: boolean
  Category?: ProductCategory
  expanded?: boolean
  inEdit?: boolean | string
  locked?: boolean
}

export interface IJobSearch {
  search?: string
  jobId?: number
  client?: string
  description?: string
  status?: string
  drawingNumber?: string
  revisionNumber?: string
  orderNumber?: string
  jobType?: string
}

export interface IJobData extends Job {
  operations: Operation[]
  jobNotes: JobNote[]
  jobDeliveries: IJobDelivery[]
  selectedData: IOption[]
  jobSubAssemblies?: JobSubAssembly[]
  expanded?: boolean
  isLoading?: boolean
  copy?: boolean
  jobIdSource?: string
  copyPurchasesId?: number[],
  quotePaymentTerm?: string
  quoteEstLeadTime?: string,
  purchaseOrder: IJobPurchaseData[]
  createdByName?: string,
  supplierId?: number
  stockQty?: number
}

export interface IEditData extends IJobData {
  deletedOperations?: Operation[]
  deletedJobNotes?: JobNote[],
  subAssembies?: ISubAssemby[]
  dueDateDateSave?: string
}

export interface IOption {
  value: string
  label: string
}

export interface IOperationChecks {
  value: string
  label: string
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
}

export interface ISelectedJobTypeData {
  id: number
  description: string
}



export interface IJobPurchaseData {
  purchaseLineNumber: number
  supplier: string
  heatNumber: string
  purchaseDate: Date
  dueDate: Date | null
  quantity: number
  createdBy: Date
  description: string
  costEach: number
  received: number,
  isReceived: boolean,
  purchaseNumber: number,
  expanded: boolean,
  PurchaseReceipts: IPurchaseReceipt[]
  isSelected: boolean,
  isEdit: boolean
}

export interface IResourcesData {
  id: number
  name: string
  description: string
}

export interface IJobReportPrintFilter {
  // from: Date | null
  // to: Date | null
  client: number
  sortBy: string
  isAllClient: boolean
  by: string
  jobType: number
  isAllJobType: boolean
  take: number
  skip: number
  toBeInvoice: boolean
}

export interface IJobReport {
  id: number,
  jobNumber: number,
  deliveryId: number,
  description: string,
  startDate: Date | null | string,
  dueDate: Date | null | string,
  estimatedHours: number,
  quantity: number
  drawingNumber: number,
  revisionNumber: number,
  clientId: number,
  orderNumber: number,
  delivered: boolean,
  quantityDelivered: number,
  salesPrice: number,
  jobTypeId: number,
  notes: string,
  heatNumber: number,
  materialMarkUp: number,
  labourMarkUp: number,
  setupText: string,
  jobCardPrinted: Date | null | string,
  jobId: number,
  ncrNumber: number,
  deliveryDate: Date | null | string,
  completedBy: string,
  isQoutedJob: boolean,
  isByHour: boolean
  salePerUnit: number,
  deliveryCharge: number,
  totalPrice: number,
  materialCost: number,
  labourCost: number,
  otherCost: number,
  totalCost: number,
  toBeInvoiced: boolean,
  invoiceNumber: string,
  parentJobNumber?: number
}

export interface IDataChecks {
  hr: number
  operatorId: number
}


export interface IJobDelivery {
  id: number
  deliveryNumber: number
  deliveryDate: Date
  createdBy: string
  quantitySent: number
}


export interface ICopyJobInfo {
  isAllPo: boolean
  isCopyOperation: boolean
}
export interface ISubAssemby {
  description: string
  drawingNumber: string
  quantity: number
  revisionNumber: string
  salePrice: number
  totalPrice: number
  salePerUnit: number
}

