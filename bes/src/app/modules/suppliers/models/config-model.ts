import { CompositeFilterDescriptor, SortDescriptor } from "@progress/kendo-data-query"
import { GridFilterOperators } from "@progress/kendo-react-grid"



export interface IStates {
    code: string,
    value: string,
    postal: string
}

export interface IAddressType {
    code: string,
    value: string
}


export interface GridSetup {
    sort: Array<SortDescriptor>
    skip: number
    take: number
    filter: CompositeFilterDescriptor
    filterOperators: GridFilterOperators
}


export interface ISuppierPrintFilter {
    from: Date | null
    to: Date | null
    supplier: number
    sortBy: string
    isAllSupplier: boolean
    by: string
}

