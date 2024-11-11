import { IClient } from "../../clients/models/client-model"
import { IJobData } from "../../jobs/models/job-model"

export interface Purchase {
  id: number,
  purchaseNumber: string,
  supplierNumber: number,
  date: Date | null | string,  
  printed: boolean,
  printedDate: Date | null | string,  
  freightCost: number,
  notes: string,
  exportMyob: boolean,
  internalNotes: string,
  invoiceText: string,
  poNotes: string,
  isCourPlsReceivePays: boolean,
  isBesArrCollection: boolean,
  isCallReady: boolean,
  isCallReadyQuoting: boolean,
  isOthers: boolean,
  otherNotes: string,
  isApproved: boolean,
  createdBy?: string,
  internal: boolean
}

export interface PurchaseLine {
  id: number,
  purchaseLineNumber: number,
  purchaseNumber: string,
  quantity: number,
  quantityReceived: number,
  received: boolean,
  description: string,
  dueDate: Date | null | string,
  costEach: number,
  costTotal: number,
  jobId: number | null,
  accountNumber: string,
  isIncludeGST: boolean,
  gstAmount: number,
  costEachTotal: number,
  isMaterialCertRequired: boolean,
  invoiceNumber: string,
  isEdit: boolean,
  isDeleted: boolean,
  refId: number,
  purchaseReceipts: IPurchaseReceipt[],
  displayJobId: string,
  clientName: string,
  jobDescription: string,
  isCompleted: boolean,
  errorMessage: string | null,
  quantityDelivered: number
}


export interface IPurchaseData extends Purchase {
  supplierId: number,
  name: string,
  address: string,
  email: string,
  concatSupplierAddress: string,
  dateCreated: Date | null,
  expanded: boolean,
  purchaseLines: PurchaseLine[],
  supplierName: string
}

export interface IPurchaseReceipt {
  id: number,
  purchaseLineNumber: number,
  date: Date | null | string,
  quantity: number,
  packingSlipNumber: string,
  heatNumber: string,
  lotNumber: string,
  goodInspctReceivedBy: string,
  note: string,
  created?: Date | null | string
}

export interface IPurchaseReceiptData extends IPurchaseReceipt { 
  supplierName: string,
  purchaseNumber: number,
  decription: string,
  jobId: number | null,
  clientName: string,
  jobDescription: string
  poQuantity: number,
  dataIndex: number,
  historyReceipts: IPurchaseReceipt[],
  dueDate: Date | null | string,
  purchaseDate: Date | null | string,
  displayJobId: string,
  quantityDelivered: number,
  displayPurchaseNumber: string,
  quantityReceived: number,
  quantityPreviouslyReceived: number
}


export interface IJob {
  id: number,
  jobId: string,
  jobNumber: number,
  description: string,
  client: IClient,
}

export interface IPurchaseList extends PurchaseLine {
  supplierName: string
  purchaseDate: Date
  printedDate: Date
}
