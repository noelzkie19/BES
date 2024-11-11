export interface QuoteDetail {
  id?: number
  description: string
  drawing: string
  revision: string
  quantity: number
  costPerUnit: number
  totalCost: number
  estLeadTime: string
  isEdit: boolean
  isDeleted: boolean
  refId?: number // on save this need to trasform to id
}
