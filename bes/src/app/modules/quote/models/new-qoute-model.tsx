import {QuoteDetail} from './quote-detail'

export interface INewQuote {
  id?: number
  number: number
  clientId: number
  description: string
  quoteNumber: string
  quoteNumberSource: string
  contactName: string
  datePrinted: Date | undefined
  status: string
  latestVersion: string
  is30DaysFromInv: boolean
  isCod: boolean
  isDepositReceivedCOD: boolean
  progressPaymentRequired: boolean
  parentId?: number
  createdBy?: string
  created?: Date | undefined
  notes: string
  totalVersion: number
}

export interface INewEditData extends INewQuote {
  details: QuoteDetail[]
  quoteVersions?: string[]
}
