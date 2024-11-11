import * as React from 'react'
import {GridFilterCellProps} from '@progress/kendo-react-grid'
import {Button} from '@progress/kendo-react-buttons'
import {DatePicker, DatePickerChangeEvent} from '@progress/kendo-react-dateinputs'

interface DateFilterCellProps extends GridFilterCellProps {
  MinValue: Date
}

export const DateFilter = (props: DateFilterCellProps) => {
  let hasValue: any = (value: any) => Boolean(value && value !== props.MinValue)

  const onChange = (event: DatePickerChangeEvent) => {
    const val = event.target.value?.toLocaleDateString();
    hasValue = hasValue(val)
    props.onChange({
      value: hasValue ? val: '',
      operator: hasValue ? 'eq' : '',
      syntheticEvent: event.syntheticEvent,
    })
  }

  const onClearButtonClick = (event: any) => {
    event.preventDefault()
    props.onChange({
      value: new Date(),
      operator: '',
      syntheticEvent: event,
    })
  }

  return (
    <div className='k-filtercell test'>
      <DatePicker
        value={props.value !== '' ? new Date(props.value) : null}
        onChange={onChange}
        format={'dd/MM/yyy'}
      />

      <Button
        title='Clear'
        disabled={!hasValue(props.value)}
        onClick={onClearButtonClick}
        icon='filter-clear'
      />
    </div>
  )
}
