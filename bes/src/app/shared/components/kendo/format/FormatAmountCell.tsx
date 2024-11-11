import * as React from 'react'
import { GridCellProps } from '@progress/kendo-react-grid'
import { CurrencyFormatter } from '../../../service/utils'
import { Skeleton } from '@progress/kendo-react-indicators'

export const FormatAmountCell = (props: GridCellProps) => {

    const { dataItem } = props
    const field = props.field || ''
    const dataValue = dataItem[field] === null ? '' : dataItem[field]

    return (
        (props.dataItem[field] === undefined) ? (
            <td>
            {" "}
            <Skeleton
            shape={"text"}
            style={{
                width: "100%",
            }}
            />
        </td>
        ) : // default rendering for this cell
        (
            <td>
                <span>{CurrencyFormatter(dataValue)}</span>
            </td>
        )
    )
}