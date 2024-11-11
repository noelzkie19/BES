export interface IColumns {
  name: string
  cell?: (...args: any) => {}
  selector?: any
  width: string
}

export interface INonConformance {
  id: number,
  ncrNumber: string,
  clientNcrNumber: string,
  recordedBy: string,
  dateRecorded: Date,
  jobNumber: number,
  natureOfNonConference: string,
  operator: string,
  determineCause: string,
  otherCause: string,
  correctedAction: string,
  action: number,
  actionDate: Date,
  reviewOfCorrectiveAction: string,
  reviewDate: Date,
  undertakenBy: number,
  completedDate: Date,
  ncrClearedBy: number,
  ncrClearedDate: Date,
  note: string,
  purchaseNumber: string,
  correctiveNotes: string,
  natureNotes: string,
  linkTo: string,
  clientName: string,
  displayJobId: string,
  iunderTakenBy: number
}


export interface INoncoformanceData extends INonConformance {
  isLoading?: boolean
}


export interface ISelectedClientData {
  id?: number
  name: string
  street: string
  city: string
  state: string
  postCode: string
  suburb: string
}

export interface IPurchaseNc {
  id?: number
  purchaseNumber: string
}


export interface INonConformanceReport {
  ncrNumber: string,
  recordedBy: string,
  dateRecorded?: Date | null,
  natureOfNonConference: string,
  clientNcrNumber: string,
  determineCause: string,
  otherCause: string,
  correctedAction: string,
  otherCorrectiveAction: string,
  reviewOfCorrectiveAction: string,
  underTakenBy: string,
  completedDate?: Date | null,
  ncrClearedBy: string,
  ncrClearedDate: string,
  action: string,
  actionDate?: Date | null,
  reportAction: string,
  reportReviewOfCorrectiveAction: string,
  reportNcrClearedBy: string,
  reportUnderTakenBy: string,
  correctiveNotes: string,
  linkTo: string
}
