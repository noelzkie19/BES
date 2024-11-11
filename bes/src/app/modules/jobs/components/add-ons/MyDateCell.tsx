import * as React from 'react'
import {GridCellProps} from '@progress/kendo-react-grid'
import {DatePicker, DatePickerChangeEvent} from '@progress/kendo-react-dateinputs'
import {dateFormat} from '../../../../shared/service/utils'
export const MyDateCell = (props: GridCellProps) => {
  const handleChange = (e: DatePickerChangeEvent) => {
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
      {dataItem.isEdit ? (
        <DatePicker onChange={handleChange} defaultValue={dataValue} format={'dd/MM/yyyy'} />
      ) : (
        dateFormat(dataValue)
      )}
    </td>
  )
}
