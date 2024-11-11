import { IAlert } from "../../../shared/components/CustomAlert";
import { IDataChecks, IJobData, JobNote, Operation } from "../models/job-model";


export const JOB_FORM_DEFAULT: IJobData = {
  id: 0,
  jobNumber: 0,
  deliveryId: 0,
  description: '',
  startDate: new Date(),
  dueDate: null,
  estimatedHours: 0,
  quantity: 0,
  drawingNumber: '',
  revisionNumber: '',
  clientId: 0,
  orderNumber: '',
  delivered: false,
  quantityDelivered: 0,
  salesPrice: 0,
  jobTypeId: 0,
  notes: '',
  heatNumber: 0,
  materialMarkUp: 0,
  labourMarkUp: 0,
  setupText: '',
  jobCardPrinted: new Date(),
  jobId: 0,
  ncrNumber: '',
  deliveryDate: null,
  completedBy: '',
  operations: [],
  jobNotes: [],
  jobDeliveries: [],
  isQoutedJob: false,
  isByHour: false,
  salePerUnit: 0,
  deliveryCharge: 0,
  totalPrice: 0,
  materialCost: 0,
  labourCost: 1.0,
  otherCost: 0,
  totalCost: 0,
  toBeInvoiced: false,
  invoiceNumber: '' ,
  selectedData: [],
  materialCostVariable: 20,
  totalMaterialCost: 0,
  jobDatePrinted: null,
  purchaseOrder: [],
  isOverruns: false,
  qtyAuthorisedOverruns: 0,
  is30Days: false,
  isCod: false,
  labourCostRate: 1,
  del: 0,
  isDuplicate: false
}

export const OPERATION_DEFAULT: Operation = {
  number: 0,
  description: '',
  dateCompleted:  null, 
  hours: 0,
  quantity: 0,
  priority: 0,
  notes: '',
  progDone: false,
  quoteId: 0,
  expectedProcessTime: null,
  prog: 0,
  set: 0,
  run: 0,
  other: 0,
  operatorId: null,
  refId: 0,
  isEdit: true,
  isDeleted: false,
  resource: '',
  resourceId: null,
  // operationResources: [],
  // operationOperators: [],
  // resourceOptions: [],
  // operatorOptions: []
  // firstFocHr: 0,
  // firstFocOperatorId: 0,
  // secondFocHr: 0,
  // secondFocOperatorId: 0,
  // thirdFocHr: 0,
  // thirdFocOperatorId: 0,
  // fourthFocHr: 0,
  // fourthFocOperatorId: 0,
  // firstPcHr: 0,
  // firstPcOperatorId: 0,
  // secondPcHr: 0,
  // secondPcOperatorId: 0,
  // thirdPcHr: 0,
  // thirdPcOperatorId: 0,
  // fourthPcHr: 0,
  // fourthPcOperatorId: 0,
  hourlyRate: 0,
  proInsFirst1: false,
  proInsFirst2: false,
  proInsFirst3: false,
  proInsINS: false,
}

export const JOB_NOTE_DEFAULT: JobNote = {
  note: '',
  date: new Date(),
  createdBy: '',
  refId: 0,
  isEdit: true,
  isDeleted: false,
}


export const TOASTER_DEFAULT: IAlert = {
    message: ``,
    header: ``,
    type: 'success'
}

export const DATACHECK_DEFAULT: IDataChecks = {
  hr: 0,
  operatorId: 0
}


		