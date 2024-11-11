import * as React from 'react'
import {Checkbox, CheckboxChangeEvent} from '@progress/kendo-react-inputs'
import {GridCellProps} from '@progress/kendo-react-grid'

export const MyBooleanCell = (props: GridCellProps) => {
  const handleChange = (e: CheckboxChangeEvent) => {
    if (props.onChange) {
      props.onChange({
        dataIndex: 0,
        dataItem: props.dataItem,
        field: props.field,
        syntheticEvent: e.syntheticEvent,
        value: e.target.value,
      })
    }
  }

  const {dataItem} = props
  const field = props.field || ''
  const dataValue = dataItem[field] === null ? '' : dataItem[field]

  return (
    <td>
      {dataItem.inEdit ? (
        <Checkbox onChange={handleChange} value={dataValue} />
      ) : dataValue ? (
        '✅'
      ) : (
        '❌'
      )}
    </td>
  )
}
