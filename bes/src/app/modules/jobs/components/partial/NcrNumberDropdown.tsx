import * as React from 'react'
import { DropDownList, DropDownListChangeEvent, DropDownListFilterChangeEvent } from '@progress/kendo-react-dropdowns'
import { useEffect, useState } from 'react'
import { filterBy } from '@progress/kendo-data-query'

interface IProps {
  optionData: any[]
  value: string
  isDisabled: boolean
  onChangeHandler: (event: DropDownListChangeEvent) => void,
  tabIndex: number
}

export const NcrNumberDropdown = (props: IProps) => {

  const [data, setData] = useState(props.optionData.slice());

  useEffect(() => {
    setData(props.optionData.slice())
  }, [props.optionData])
  
  const filterData = (filter: any) => {
    const data = props.optionData.slice();
    return filterBy(data, filter);
  };
  const filterChange = (event: DropDownListFilterChangeEvent) => {
    setData(filterData(event.filter));
  };

  return (
    <DropDownList
      data={data}
      textField="text"
      filterable={true}
      onFilterChange={filterChange}
      onChange={props.onChangeHandler}
      disabled={props.isDisabled}
      defaultValue={{id: props.value, text: props.value}}
      tabIndex={props.tabIndex}
      style={{
        width: "100%",
        backgroundColor: 'transparent'
      }}
    />
  )
}

