import * as React from 'react'
import { GridCellProps } from '@progress/kendo-react-grid'
import { Checkbox } from '@progress/kendo-react-inputs'

export const FormatBooleanCell = (props: GridCellProps) => {

    const { dataItem } = props
    const field = props.field || ''
    const dataValue = dataItem[field] === null ? '' : dataItem[field]

    return (
        <td>
            <Checkbox value={dataValue} disabled />
        </td>
    )
}