import { CompositeFilterDescriptor, SortDescriptor } from "@progress/kendo-data-query"
import { GridFilterOperators } from "@progress/kendo-react-grid"

export interface GridSetup {
    sort: Array<SortDescriptor>
    skip: number
    take: number
    filter: CompositeFilterDescriptor
    filterOperators: GridFilterOperators
}

