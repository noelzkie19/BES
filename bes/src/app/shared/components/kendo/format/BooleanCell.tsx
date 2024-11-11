import * as React from 'react'
import { Checkbox, CheckboxChangeEvent } from '@progress/kendo-react-inputs'
import { GridCellProps } from '@progress/kendo-react-grid'

export const BooleanCell = (props: GridCellProps) => {
    const handleChange = (e: CheckboxChangeEvent) => {
        if (props.onChange) {
            props.onChange({
                dataIndex: props.dataIndex,
                dataItem: {
                    ...props.dataItem,
                    isSelected: e.value
                },
                field: props.field,
                syntheticEvent: e.syntheticEvent,
                value: e.target.value,
            })
        }
    }

    const { dataItem } = props
    const field = props.field || ''
    const dataValue = dataItem[field] === null ? '' : dataItem[field]

    return (
        <td>
            <div>
                <Checkbox onChange={handleChange} value={dataValue} />
            </div>
        </td>
    )
}