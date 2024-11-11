
import * as React from 'react'
import { GridCellProps } from '@progress/kendo-react-grid'
import { dateFormat } from '../../../service/utils'

export const FormatDateCell = (props: GridCellProps) => {

    const { dataItem } = props
    const field = props.field || ''
    const dataValue = dataItem[field] === null ? '' : dataItem[field]

    return (
        <td>
            <span>{dateFormat(dataValue)}</span> 
        </td>
    )
}