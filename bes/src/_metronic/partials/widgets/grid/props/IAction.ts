import { DropDownListChangeEvent } from "@progress/kendo-react-dropdowns";
import { GridCellProps } from "@progress/kendo-react-grid";

export interface IActionProps {
    actions: any[]
}

export interface IActionGridProps extends IActionProps {
    isCanEdit?: boolean,
    gridCellProps: GridCellProps,
    changeHandler: (event: DropDownListChangeEvent, items: any, dataIndex: number) => void
}

export interface IActionOptionProps {
    actions: IActionOption[]
}

export interface ISelectedColumn {
    columnName: string,
    columnTitle: string,
    dataType: any
}

export interface IActionOption {
    action: string,
    icon: string,
    color: string,
    hoverText: string
}

export interface IActionGridIconProps extends IActionOptionProps {
    gridCellProps: GridCellProps,
    changeHandler: (action: string, items: any, dataIndex: number) => void
}

