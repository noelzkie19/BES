import { CompositeFilterDescriptor, SortDescriptor } from "@progress/kendo-data-query"
import { GridFilterOperators } from "@progress/kendo-react-grid"

export interface GridSetup {
    sort: Array<SortDescriptor>
    skip: number
    take: number
    filter: CompositeFilterDescriptor
    filterOperators: GridFilterOperators
}

export interface INatureOfConference {
    code: string,
    value: string
}

export interface IDetermineCause {
    code: string,
    value: string
}

export interface ICorrectiveAction {
    code: string,
    value: string
}

export interface INCrecordedBy {
    code: string,
    value: string
}

export interface INonConformancePrintFilter {
    from: Date | null
    to: Date | null
    ncrNumber: string
    sortBy: string
    isAllNcrNumber: boolean
    by: string
}

export interface IReviewOfCorrectiveAction {
    code: string,
    value: string
}

