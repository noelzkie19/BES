import { GridCellProps } from '@progress/kendo-react-grid'
import { dateFormat } from '../../../service/utils'
import { Skeleton } from '@progress/kendo-react-indicators'

export const DateFormatCell = (props: GridCellProps) => {
    const { dataItem } = props
    const field = props.field || ''
    const dataValue = dataItem ? (dataItem[field] ? dataItem[field] : '') : ''

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
                {dateFormat(dataValue)}
            </td>
        )
    )
}