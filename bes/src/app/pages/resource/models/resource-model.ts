import { CompositeFilterDescriptor, SortDescriptor } from "@progress/kendo-data-query"

export interface Resource {
  id?: number
  name: string
  description: string
  hourlyRate: number
  isActive: boolean
}
export interface GridSetup 
{
  sort: Array<SortDescriptor>
  skip: number
  take: number
  filter: CompositeFilterDescriptor
}