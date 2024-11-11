import { CompositeFilterDescriptor, SortDescriptor } from "@progress/kendo-data-query"
import { DropDownListChangeEvent } from "@progress/kendo-react-dropdowns"
import { GridFilterOperators } from "@progress/kendo-react-grid"
import { IActionProps, ISelectedColumn } from "./IAction"

export interface IGridProps {
   dataProps: IDataProps,
   actionProps: IActionProps,
   selectedColumns: ISelectedColumn[],
   gridSetup: IGridSetup,
   actionHandler: (event: DropDownListChangeEvent, items: any, dataIndex: number) => void,
   onPageChange: (event: any) => void
}

export interface IGridSetup {
   sort: Array<SortDescriptor>
   skip: number
   take: number
   filter: CompositeFilterDescriptor
   filterOperators: GridFilterOperators
}



export interface IDataProps {
   data: any[],
   totalRows: number,
}

