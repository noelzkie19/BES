import { CompositeFilterDescriptor, SortDescriptor } from "@progress/kendo-data-query"

export interface IColumns {
  name: string
  cell?: (...args: any) => {}
  selector?: any
  width: string
}

export interface IStocks {
  id?: number
  clientName: string
  description: string
  drawing: string
  revision: string
  quantity: number
  jobId?: number | null
  notes: string
  deleted?: string
  clientId?: number,
}

export interface IStockSearch {
  id?: number
  search?: string
  clientName?: string
  description?: string
  drawing?: number
  revision?: number
  quantity?: number
  jobId?: number
  notes?: string
  clientId?: number
}

export interface IClientSearch {
  search?: string
  clientId?: number
  clientName?: string
  suburb?: string
  postalCode?: string
  phone?: string
  contactPerson?: string
}
export interface IJobSearch {
  search?: string
  JobId?: number
  clientId?: number
}
export interface IJob {
  id?: number
  jobNumber: number
  jobTypeId: number
  clientId: number
  description: string
  jobId: string
}
export interface GridSetup 
{
    sort: Array<SortDescriptor>
    skip: number
    take: number
    filter: CompositeFilterDescriptor
}

export interface IStockReport {
  jobNumber: number,
  description: string,
  deliveryNumber: number,
  clientName: string,
  quantitySend: number,
  deliveryDate: boolean,
  price: number
}

export interface ColumnStockInterface {
  title?: string,
  field?: string,
  show?: boolean,
  filter?: "boolean" | "numeric" | "text" | "date" | undefined,
  minWidth?: number,
  minGridWidth?: number,
  locked?: boolean,
  width?: string | number
}

export interface IStockPrintFilter {
  client: number
  sortBy: string
  isAllClient: boolean
}